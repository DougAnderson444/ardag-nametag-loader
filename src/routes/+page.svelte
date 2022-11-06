<script>
	// @ts-nocheck

	import MenuWrapper from '$lib/MenuWrapper.svelte';
	import NameTag from '$lib/NameTag.svelte';
	/**
	 * Also works:
	 * hbaAsPk0AlmLPFLSNqgH0tk-Z20RL1rOxuXMTuOUTDw
	 * douganderson444.ar
	 * douganderson444.arweave.dev
	 * did:ar:UGnqpxdraMbkmG-4F6jU7xkFhErNgaXLQf39tW7yYck
	 */
	export let namespace = 'douganderson444';
	export let tag = 'PeerPiper-Web3-Wallet-Connector';

	// export let link; // pass in link to standalone version of this page
</script>

<!-- TODO: Add Menu to allow users to interact with App and Data -->

<MenuWrapper let:handleTarget {namespace} {tag}>
	<NameTag {namespace} {tag} on:target on:change />
	<!-- <div class="m-4 p-4">Menu</div> -->
</MenuWrapper>
