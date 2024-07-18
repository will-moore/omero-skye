<script>
	export let imgData;

	let innerWidth = 0;
	let innerHeight = 0;

    $: zoom = 100;
    $: dx = 0;
    $: dy = 0;
    // reset zoom and pan when imgData changes (new Image)
    $: if (imgData.id > 0) {
        zoom = 100;
        dx = 0;
        dy = 0;
    }

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

<div class="viewport">
<!-- <img
	class="preview"
	style:--viewtransitionkey="image-{imgData.id}"
	style:background-image="url('https://idr.openmicroscopy.org/webclient/render_thumbnail/{imgData.id}/')"
	style:width="{imgWidth}px"
	style:height="{imgHeight}px"
	style:left="{(-(imgWidth - innerWidth) / 2) + dx}px"
	style:top="{(-(imgHeight - (innerHeight - THUMBHEIGHT)) / 2) + dy}px"
	alt="Thumbnail of {imgData.meta.Name}"
	src="https://idr.openmicroscopy.org/webclient/render_image/{imgData.id}/"
/> -->

<div style:width="100%">
    Image Viewer
</div>


<!-- <div class="dims">
	<p>Inner Width: {innerWidth}</p>
	<p>Inner Height: {innerHeight}</p>
    <p>imgWiderThanViewport: {imgWiderThanViewport}</p>
    <p>imgWidth: {imgWidth}</p>
    <p>imgHeight: {imgHeight}</p>
    <p>Zoom: {zoom}</p>
    <button on:click={() =>zoom += 10}>+</button>
    <button on:click={() =>zoom -= 10}>-</button>
</div> -->
</div>

<style>
    .viewport {
        position: relative;
        width: 100%;
        height: 100%;
        /* border: solid green 1px; */
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
        flex: 0 0 100%;
        scroll-snap-align: center;
    }

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
