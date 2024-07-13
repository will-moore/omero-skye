<script>
	export let data;

	console.log('Image data', data);
</script>

<h1>{data.imgData.meta.imageName}</h1>
<h2>Image: {data.imgData.id}</h2>

<a href="/image/{data.imgData.id}/annotations">Annotations</a>

<table>
    <tbody>
        <tr><td>Size:</td><td>{data.imgData.size.width} x {data.imgData.size.height}</td></tr>
    </tbody>
</table>

<a href="/{data.otype}/{data.obj['@id']}">Back to Dataset</a>

<div class="imgviewer">
	<img
		class="preview"
		style:--viewtransitionkey="image-{data.params.iid}"
		alt="Thumbnail of {data.obj.Name}"
		src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{data.params.iid}/"
	/>
	<a href="https://idr.openmicroscopy.org/webclient/img_detail/{data.params.iid}/"
		>Open in iviewer</a
	>
</div>

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

<style>
	.thumbnail {
		max-width: 48px;
		max-height: 48px;
		margin: 3px;
		float: left;
	}
	.selected {
		border: solid red 5px;
	}

	.imgviewer {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.preview {
		width: 192px;
		height: 192px;
	}
	img {
		view-transition-name: var(--viewtransitionkey);
	}
</style>
