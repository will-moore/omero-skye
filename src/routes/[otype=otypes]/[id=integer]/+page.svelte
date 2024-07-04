<script>
	import { onMount } from 'svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.otype}</title>
	<meta name="description" content="Showing data from OMERO" />
</svelte:head>

<div class="text-column">
	<h1>{data.otype}:{data.obj['@id']} {data.obj.Name}</h1>

	{#if data.otype=="image"}
		<img alt="Thumbnail of {data.obj.name}" src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{data.obj['@id']}/"/>
		<a href="https://idr.openmicroscopy.org/webclient/img_detail/{data.obj['@id']}/">Open in iviewer</a>
	{/if}

	<ul>
		{#each data.children as child}
			<li><a href="/{data.chType}/{child.id}">
				{#if data.chType=="image"}
					<img alt="Thumbnail of {child.name}" src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{child.id}/"/>
				{/if}
				{child.name}
			</a></li>
		{/each}
	</ul>
</div>
