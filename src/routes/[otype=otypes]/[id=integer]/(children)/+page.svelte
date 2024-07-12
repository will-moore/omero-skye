<script>
	export let data;
</script>

<svelte:head>
	<title>{data.otype}</title>
	<meta name="description" content="Showing data from OMERO" />
</svelte:head>

<div class="text-column">

	<a href="/{data.otype}/{data.obj['@id']}/annotations">Annotations</a>

	<ul>
		{#each data.children as child}
			<li>
				{#if data.chType == 'image'}
					<a href="/{data.otype}/{data.obj['@id']}/{data.chType}/{child.id}">
						<img
							style:--viewtransitionkey="image-{child.id}"
							class="thumbnail"
							alt="Thumbnail of {child.name}"
							src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{child.id}/"
						/>
						{child.name}
					</a>
				{:else}
					<a href="/{data.chType}/{child.id}">
						{child.name}
						{#if child?.childCount}
							({child.childCount})
						{/if}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>

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
	img {
		view-transition-name: var(--viewtransitionkey);
	}
</style>
