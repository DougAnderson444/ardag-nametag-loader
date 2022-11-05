<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	export let src: string;
	export let props = {};

	let target: HTMLElement;
	const dispatch = createEventDispatcher();

	onMount(async () => {
		if (!src) return;
		mountSrc({ text: src, target, props });
	});

	async function mountSrc({
		text,
		target,
		props
	}: {
		text: string;
		target: HTMLElement;
		props: any;
	}) {
		const blob = new Blob([text], { type: 'text/javascript' });
		const url = URL.createObjectURL(blob);
		const App = (await import(/* @vite-ignore */ url)).default;
		target.innerHTML = '';
		const app = new App({
			target,
			props
		});
		if (url) URL.revokeObjectURL(url); // memory management
		dispatch('ready', App);
		dispatch('target', target);
		app.$on('change', (data: any) => {
			dispatch('change', data);
		});
		return app;
	}
</script>

<div bind:this={target} />
