<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	export let tags: any[] = null;

	const dispatch = createEventDispatcher();
	let selectedTag;

	$: selectedTag && dispatch('tagSelected', selectedTag);
</script>

{#if tags && tags.length}
	<div class={!selectedTag ? 'text-red-600' : 'text-green-800'}>Please select a tag to display</div>
	{#each tags as tag}
		<div class="flex flex-row cursor-pointer">
			<div class="flex-1 flex flex-col">
				<h2
					class="text-lg font-semibold p-2 m-2 border rounded w-fit {selectedTag == tag
						? 'bg-green-200'
						: 'bg-slate-100'}"
					on:click={(e) => (selectedTag = tag)}
					on:keypress={(e) => (selectedTag = tag)}
				>
					{tag}
				</h2>
			</div>
		</div>
	{/each}
{/if}
