<script>
	// @ts-nocheck

	/**
	 * Resolves a @ namespace/tag from ArDag
	 */
	import { onMount } from 'svelte';
	import { arnsResolver } from '@peerpiper/did-ar';
	import Arweave from 'arweave';
	import Mount from './Mount.svelte';
	import { initializeArDag } from '@douganderson444/ardag';
	import { getArweaveAddress, fromDid, isDID, isAddress, getDagData } from './utils';
	import { arweaveConfig as config } from './config';

	export let namespace;
	export let tag;
	export let arweave = null;
	export let arweaveConfig = config;

	let dag, ardag, Gateway;
	let tagNode, esModule, props;

	onMount(async () => {
		const namePattern = new RegExp('^[a-zA-Z0-9_-]+$');

		const regex = new RegExp(
			`^.*(^[^/]+\.ar|^[^/]+\.arweave\.dev|^[a-zA-Z0-9_-]{43}|^did:ar.*:[a-zA-Z0-9_-]{43})$`
		);

		// check to ensure the namespace meets the regex requirements
		if (!regex.test(namespace) && !namePattern.test(namespace)) {
			throw new Error(
				`Invalid namespace: ${namespace}. Must be a valid arweave address, name.ar, name.arweave.dev address, or did:ar address.`
			);
		}

		({ Gateway } = await import('@douganderson444/svelte-component-gateway'));

		if (!dag && !globalThis.dag) {
			const { createDagRepo } = await import('@douganderson444/ipld-car-txs');
			dag = await createDagRepo({ persist: false });
			globalThis.dag = dag;
		} else {
			dag = globalThis.dag;
		}

		let addresses;

		if (isAddress(namespace)) {
			addresses = [namespace];
		} else {
			// not address, get address from RSA key in DIDDoc from either a did or a name
			let didDoc;

			try {
				// remove .ar or .arweave.dev from end of namespace string, as req'd
				didDoc = isDID(namespace)
					? await fromDid(namespace) // did
					: await arnsResolver(namespace.replace(/\.ar$|\.arweave\.dev$/, '')); // ARNS name
			} catch (error) {
				console.log('Failed to resolve', namespace, error);
			}

			// get RSA keys from DID Document
			const rsaKeys = didDoc.verificationMethod.filter((vm) => vm.publicKeyJwk.kty === 'RSA');
			if (!rsaKeys.length) throw new Error('No RSA keys found in DID document');

			// for each rsa kty, get the public keys
			addresses = rsaKeys.map((vm) => getArweaveAddress(vm.publicKeyJwk));
		}

		arweave = arweave || Arweave.init(arweaveConfig);

		ardag = initializeArDag({ arweave });
		// go through all addresses until a match is found
		for (const dagOwner of addresses) {
			try {
				// design trade off between 3 calls to arweave, or loading the whole DAG into mem or disk and loading cid from there
				// One methods calls internet but is always the latest
				// Other methods caches the most recent, but takes up memory / disk

				// 1. Network heavy approach:
				// tagNode = await ardag.get({ dagOwner, tag });
				// console.log('tagNode', { tagNode }, { ardag });
				// esModule = (await ardag.get({ dagOwner, cid: tagNode.compiled }))?.value || null;
				// props = (await ardag.get({ dagOwner, cid: tagNode.data }))?.value || null;

				// 2. Local heavy approach:
				// TODO: Cache dagOwner instances in localstorage?
				const arDagInstance = await ardag.getInstance({
					dag,
					dagOwner
				});

				tagNode = await arDagInstance.latest(tag);

				if (tagNode?.dappowner && tagNode.dappowner !== dagOwner) {
					console.log("Using another person's app, load it into the dag so the CID is present");
					await ardag.load({ dagOwner: tagNode.dappowner, dag });
				}

				// since tagNode.compiled is a CID, we need to get the data from the dag
				esModule = await getDagData('compiled');
				props = await getDagData('data');

				async function getDagData(key) {
					if (!tagNode[key]) return null;
					let val;
					try {
						val = (await dag.get(tagNode[key]))?.value?.value;
					} catch (error) {
						// no props given
						console.log('No props given. Set as null.');
						val = null;
					}
					return val;
				}

				console.log({ esModule, props });
				// break out of the loop
				break;
			} catch (error) {
				console.log(`No ArDag on address ${dagOwner}`, error);
			}
		}
	});
</script>

{#if Gateway && (esModule || (props && esModule))}
	{#if tagNode?.meta?.networkRequired}
		<Mount src={esModule} {props} on:change on:target />
	{:else}
		<svelte:component this={Gateway} {esModule} {props} on:change />
	{/if}
{/if}
