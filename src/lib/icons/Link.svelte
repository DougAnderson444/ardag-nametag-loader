<script>
	// @ts-nocheck

	export let link;
	export let bookmarked = false;

	let menu, slot;
	let show = false;
	let position, top, left;
	let target = null;

	async function handleTarget(e) {
		// copy display property from grandChild to menu
		console.log('e', e.detail.children[0]);
		target = e.detail.children[0];
	}
	function handleFocus(e) {
		if (target) position = window?.getComputedStyle(target)?.position || 'absolute';
		if (target) top = (target.getBoundingClientRect()?.top || 0) - menu?.offsetHeight + 'px';
		if (target) left = (target.getBoundingClientRect()?.right || 0) + 'px';
		show = true;
	}
	function handleBlur(e) {
		show = false;
	}
	function bookmarker(e) {
		bookmarked = !bookmarked;
	}
</script>

<div class="h-6 w-6 m-2" title="Open App in New Window">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.8 283.8" xml:space="preserve">
		<path
			d="m265 23-10-9a56 56 0 0 0-78 5l-29 32c-6 7-5 18 2 24l2 3c8 6 19 5 25-2l28-32c7-7 18-7 25-1l10 9c7 6 7 17 1 24l-62 70c-5 6-14 7-21 3-7-3-17-2-22 5h-1a19 19 0 0 0 6 30 56 56 0 0 0 67-13l62-70c20-23 18-58-5-78z"
		/>
		<path
			d="m134 209-3-3c-7-6-18-5-24 2l-29 32c-6 7-17 7-24 1l-10-9c-7-6-8-17-1-24l62-70c5-6 13-7 20-4 8 4 18 2 24-4v-1a18 18 0 0 0-5-28c-23-13-51-8-68 12l-62 69a56 56 0 0 0 5 79l10 9a55 55 0 0 0 78-5l28-32c7-7 6-18-1-24z"
		/>
	</svg>
</div>
