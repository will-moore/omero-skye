<script>
	export let data;
</script>

<svelte:head>
	<title>{data.otype}</title>
	<meta name="description" content="Showing data from OMERO" />
</svelte:head>

<div class="text-column">
	<div class="header">
		<h1>{data.obj.Name}</h1>
		<h2>{data.otype}:{data.obj['@id']}</h2>
		<a href="/{data.otype}/{data.obj['@id']}/annotations">Annotations</a>
	</div>

	{#if data.otype == 'image'}
		<img
			alt="Thumbnail of {data.obj.name}"
			src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{data.obj['@id']}/"
		/>
		<a href="https://idr.openmicroscopy.org/webclient/img_detail/{data.obj['@id']}/"
			>Open in iviewer</a
		>
	{/if}

	<ul>
		{#each data.children as child}
			<li>
				<a href="/{data.chType}/{child.id}">
					{#if data.chType == 'image'}
						<img
							class="thumbnail"
							alt="Thumbnail of {child.name}"
							src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{child.id}/"
						/>
					{/if}
					{child.name}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.header {
		padding: 10px;
	}

	.thumbnail {
		width: 48px;
		height: 48px;
	}

	ul {
		padding: 10px;
	}
	li {
		list-style: none;
	}
	a {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 5px 0;
		gap: 5px;
	}
</style>
