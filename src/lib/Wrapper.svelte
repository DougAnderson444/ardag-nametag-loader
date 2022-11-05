<script>
	import DirectTag from '$lib/DirectTag.svelte';
	/**
	 * Also works:
	 * hbaAsPk0AlmLPFLSNqgH0tk-Z20RL1rOxuXMTuOUTDw
	 * douganderson444.ar
	 * douganderson444.arweave.dev
	 * did:ar:UGnqpxdraMbkmG-4F6jU7xkFhErNgaXLQf39tW7yYck
	 */
	let namespace = 'douganderson444';
	let tag = 'PeerPiper-Web3-Wallet-Connector';
</script>

<DirectTag {namespace} {tag} on:change />
