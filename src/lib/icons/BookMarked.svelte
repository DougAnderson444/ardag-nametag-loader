<script>
	// @ts-nocheck
	import ToolTip from './ToolTip.svelte';

	export let link;
	export let bookmarked = false;

	function bookmarker(e) {
		bookmarked = !bookmarked;
	}
</script>

<!-- on hover show tooltip "Save for later" -->
<div class="relative right-0">
	{#if !bookmarked}
		<div class="h-6 w-6 m-2" on:click={bookmarker} on:keypress={bookmarker} title="Save for Later">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" xml:space="preserve">
				<path
					d="M265 0H65c-8 0-15 7-15 15v300a15 15 0 0 0 24 12l91-73 91 73a15 15 0 0 0 24-12V15c0-8-7-15-15-15zm-15 284-76-61c-2-2-6-3-9-3s-7 1-9 3l-76 61V30h170v254z"
				/>
			</svg>
		</div>
	{:else}
		<div class="h-6 w-6 m-2" on:click={bookmarker} on:keypress={bookmarker} title="Remove Bookmark">
			<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
				<path d="M16 2H8C6 2 5 3 5 5v17h2l5-3 6 3 1-1V5c0-2-1-3-3-3z" />
			</svg>
		</div>
	{/if}
</div>
