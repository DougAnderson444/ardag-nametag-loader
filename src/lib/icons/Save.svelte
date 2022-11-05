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

<div class="m-2 h-6 w-6" title="Save Your Data">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" xml:space="preserve">
		<path
			d="M326 85 245 4c-2-2-6-4-10-4H15C7 0 0 7 0 15v300c0 8 7 15 15 15h300c8 0 15-7 15-15V95c0-4-2-8-4-10zM90 30h30v40a15 15 0 0 0 30 0V30h30v80H90V30zm150 210H90v-30h150v30zM90 300v-30h150v30H90zm210 0h-30V195c0-8-7-15-15-15H75c-8 0-15 7-15 15v105H30V30h30v95c0 8 7 15 15 15h120c8 0 15-7 15-15V30h19l71 71v199z"
		/>
	</svg>
</div>
