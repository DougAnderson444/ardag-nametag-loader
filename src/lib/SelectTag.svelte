<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { arnsResolver } from '@peerpiper/did-ar';
	import { initializeArDag } from '@douganderson444/ardag';
	import Arweave from 'arweave';
	import { arweaveConfig } from './config';
	import { getArweaveAddress } from './utils';
	import ListTags from './ListTags.svelte';
	import Mount from './Mount.svelte';

	export let namespace;
	export let arweave = null;
	let dag;
	let ardag;
	let addrNodes;
	let selectedTag;
	let esModule;
	let selectedAddr;
	let Gateway;
	let props = { name: 'Dougals' };
	let data;
	let tagNode;
	let loader = {};

	onMount(async () => {
		({ Gateway } = await import('@douganderson444/svelte-component-gateway'));

		if (!dag && !globalThis.dag) {
			const { createDagRepo } = await import('@douganderson444/ipld-car-txs');
			dag = await createDagRepo({ persist: false });
			globalThis.dag = dag;
		} else {
			dag = globalThis.dag;
		}

		// resolve namespace to DID Document
		console.log('Resolving ', namespace);
		const didDoc = await arnsResolver(namespace);

		// get RSA keys from DID Document
		const rsaKeys = didDoc.verificationMethod.filter((vm) => vm.publicKeyJwk.kty === 'RSA');
		if (!rsaKeys.length) throw new Error('No RSA keys found in DID document');

		// for each rsa kty, get the public keys
		const addresses = rsaKeys.map((vm) => getArweaveAddress(vm.publicKeyJwk));

		arweave = arweave || Arweave.init(arweaveConfig);

		// get ArDag for each addresses
		ardag = initializeArDag({ arweave });

		addrNodes = await Promise.all(
			addresses.map(async (addr) => {
				// or get all tag keys
				const rootNode = await ardag.get({ dagOwner: addr });
				// preload each address dag tag? but dont await it so we can show the UI
				loader[addr] = ardag.load({ dagOwner: addr, dag }); // Promise that resolves to rootCID for this addr tagNodes
				// console.log({ rootNode });
				return { addr, rootNode };
			})
		);
		console.log({ addrNodes });
	});

	$: if (selectedTag) {
		console.log('selectedTag', { selectedTag }, { selectedAddr });
		tagSelected();
	}

	async function tagSelected() {
		try {
			// loader[addr] is a promise that resolves to the rootCID
			const rootCID = await loader[selectedAddr]; // || await ardag.load({ dagOwner: selectedAddr, dag });
			tagNode = (await dag.get(rootCID, { path: `${selectedTag}/obj/` })).value;
		} catch (error) {
			throw new Error(error);
		}

		try {
			esModule = await getEsModule(tagNode);
			props = await getDataProps(tagNode);
		} catch (error) {
			// if fail, it's possible one owner is using another owner's DAAp, which is not present in their dag, so fetch it
			if (!tagNode.dappowner)
				throw new Error('No DApp or DApp owner found. Do not know where to fetch DApp from.');
			const rootCID = await ardag.load({ dagOwner: tagNode.dappowner, dag });
			props = await getDataProps(tagNode);
			esModule = await getEsModule(tagNode);
		}
	}

	async function getEsModule(tagNode) {
		return (await dag.get(tagNode.compiled)).value.value;
	}

	async function getDataProps(tagNode) {
		if (!tagNode?.data) return {};
		let props;
		try {
			props = (await dag.get(tagNode?.data)).value.value;
		} catch (error) {
			// no props given
			console.log('No props given. Set as null.');
			props = null;
		}

		return props;
	}
</script>

{namespace}
{#if addrNodes && addrNodes.length}
	{#each addrNodes as { addr, rootNode }}
		For Address: {addr}<br />
		<ListTags
			tags={Object.keys(rootNode)}
			on:tagSelected={(e) => {
				selectedAddr = addr;
				selectedTag = e.detail;
			}}
		/>
	{/each}
{/if}

{#if Gateway && (esModule || (props && esModule))}
	<div class="flex-1 flex flex-col">
		<div class="flex-1 w-full my-0 mx-auto box-border justify-start">
			{#if tagNode?.meta?.networkRequired}
				<Mount src={esModule} {props} />
			{:else}
				<svelte:component
					this={Gateway}
					{esModule}
					{props}
					on:change
					on:change={(e) => (data = e.detail)}
				/>
			{/if}
		</div>
	</div>
{/if}
