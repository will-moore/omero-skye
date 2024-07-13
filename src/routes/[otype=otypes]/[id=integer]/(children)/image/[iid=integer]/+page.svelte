<script>
	export let data;

	console.log('Image data', data);
</script>

<div class="fullpage">
	<div class="imgviewer">
		<img
			class="preview"
			style:--viewtransitionkey="image-{data.params.iid}"
			alt="Thumbnail of {data.obj.Name}"
			src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{data.params.iid}/"
		/>
	</div>

	<div class="thumbnails">
		{#each data.children as child}
			<a href="/{data.otype}/{data.obj['@id']}/{data.chType}/{child.id}">
				{#if child.id != data.params.iid}
					<img
						class="thumbnail"
						loading="lazy"
						alt="Thumbnail of {child.name}"
						src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{child.id}/"
					/>
				{:else}
					<img
						class="thumbnail selected"
						alt="Thumbnail of {child.name}"
						src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{child.id}/"
					/>
				{/if}
			</a>
		{/each}
	</div>
</div>

<aside>
	<details>
		<summary> Info </summary>
		<h1>{data.imgData.meta.imageName}</h1>
		<h2>Image: {data.imgData.id}</h2>

		<a href="/image/{data.imgData.id}/annotations">Annotations</a> |
		<a href="https://idr.openmicroscopy.org/webclient/img_detail/{data.params.iid}/"
			>Open in iviewer</a
		>

		<table>
			<tbody>
				<tr><td>Size:</td><td>{data.imgData.size.width} x {data.imgData.size.height}</td></tr>
			</tbody>
		</table>
	</details>
</aside>

<div class="back">
	<a href="/{data.otype}/{data.obj['@id']}">Back to Dataset</a>
</div>

<style>
	.fullpage {
		position: fixed;
		inset: 0;
		background-color: lightgrey;
		display: flex;
		flex-direction: column;
	}

	aside,
	.back {
		position: fixed;
		top: 10px;
		background-color: white;
		padding: 10px;
	}
	.back {
		left: 10px;
	}
	aside {
		right: 10px;
	}

	.thumbnails {
		display: flex;
		overflow-x: scroll;
		flex: 0 1 54px;
		z-index: 1;
		background: white;
	}

	.thumbnail {
		max-width: 48px;
		max-height: 48px;
		margin: 3px;
	}
	.selected {
		border: solid red 5px;
	}

	.imgviewer {
		flex: 1 0 auto;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.preview {
		min-width: 100%;
		position: absolute;
	}
	img {
		view-transition-name: var(--viewtransitionkey);
	}
</style>
