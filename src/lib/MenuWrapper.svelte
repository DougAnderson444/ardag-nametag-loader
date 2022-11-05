<script>
	// @ts-nocheck
	/**
	 * Wrap an App with a Sharing menu
	 */
	import { fade } from 'svelte/transition';
	import BookMarked from './icons/BookMarked.svelte';
	import Save from './icons/Save.svelte';
	import Link from './icons/Link.svelte';
	import CopyApp from './icons/CopyApp.svelte';
	/**
	 * Link opens the app as a standalone page
	 * Bookmark adds the app to the user's bookmarks as a dag tag, but no data yet (theyll do it later)
	 * Copy... adds to your dag like bookmark, but also takes you your home page?
	 */
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
</script>

{#if show}
	<div
		out:fade={{ duration: 3000 }}
		bind:this={menu}
		style:position
		style:top
		style:left
		on:mouseleave={handleBlur}
		on:mouseout={handleBlur}
		on:blur={handleBlur}
		on:mouseover={handleFocus}
		on:focus={handleFocus}
		class="flex flex-row absolute"
	>
		<BookMarked bind:bookmarked {link} />
		<CopyApp {link} />
		<Link />
		<Save />
	</div>
{/if}
<div
	bind:this={slot}
	on:mouseover={handleFocus}
	on:focus={handleFocus}
	on:mouseout={handleBlur}
	on:blur={handleBlur}
>
	<slot {handleTarget} />
</div>
