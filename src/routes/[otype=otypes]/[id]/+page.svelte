<script>
	import { onMount } from 'svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.otype}</title>
	<meta name="description" content="Showing data from OMERO" />
</svelte:head>

<div class="text-column">
	<h1>{data.otype} {data.obj.Name}</h1>

	<ul>
		{#each data.children as child}
			<li><a href="/{data.chType}/{child.id}">{child.name}</a></li>
		{/each}
	</ul>
</div>
