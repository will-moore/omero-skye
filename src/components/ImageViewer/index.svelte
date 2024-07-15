<script>
	export let imgData;

	let innerWidth = 0;
	let innerHeight = 0;
    let zoom = 100;

	const THUMBHEIGHT = 50; //approx
	$: viewportRatio = innerWidth / (innerHeight - THUMBHEIGHT);
	let imageRatio = imgData.size.width / imgData.size.height;
	$: imgWiderThanViewport = imageRatio > viewportRatio;
	console.log('imgTallerThanViewport', imgWiderThanViewport);

	$: imgWidth = zoom / 100 * (imgWiderThanViewport ? innerWidth : (innerHeight - THUMBHEIGHT) * imageRatio);
	$: imgHeight = zoom / 100 * (imgWiderThanViewport ? innerWidth / imageRatio : innerHeight - THUMBHEIGHT);


</script>

<!-- TODO: bind to viewport element instead of window? -->
<svelte:window bind:innerWidth bind:innerHeight />

<img
	class="preview"
	style:--viewtransitionkey="image-{imgData.id}"
	style:background-image="url('https://idr.openmicroscopy.org/webclient/render_thumbnail/{imgData.id}/')"
	style:width="{imgWidth}px"
	style:height="{imgHeight}px"
	style:top="0px"
	style:left="0px"
	alt="Thumbnail of {imgData.meta.Name}"
	src="https://idr.openmicroscopy.org/webclient/render_image/{imgData.id}/"
/>

<div class="dims">
	<p>Inner Width: {innerWidth}</p>
	<p>Inner Height: {innerHeight}</p>
    <p>imgWiderThanViewport: {imgWiderThanViewport}</p>
    <p>imgWidth: {imgWidth}</p>
    <p>imgHeight: {imgHeight}</p>
    <p>Zoom: {zoom}</p>
    <button on:click={() =>zoom += 10}>+</button>
    <button on:click={() =>zoom -= 10}>-</button>
</div>

<style>
	.preview {
		/* min-width: 100%; */
		position: absolute;
		background-size: cover;
		background-repeat: no-repeat;
	}
	img {
		view-transition-name: var(--viewtransitionkey);
	}

	.dims {
		position: absolute;
        top: 100px;
        left: 10px;
        background-color: white;
	}
</style>
