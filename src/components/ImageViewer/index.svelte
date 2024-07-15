<script>
	export let imgData;

	let innerWidth = 0;
	let innerHeight = 0;

	$: condition = innerWidth * 1.33 <= innerHeight;
    $: imgWidth = innerWidth - 20;
</script>

<svelte:window bind:innerWidth bind:innerHeight />


<img
	class="preview"
	style:--viewtransitionkey="image-{imgData.id}"
	style:background-image="url('https://idr.openmicroscopy.org/webclient/render_thumbnail/{imgData.id}/')"
    style:width="{imgWidth}px"
    style:height="{imgWidth}px"
	alt="Thumbnail of {imgData.meta.Name}"
	src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{imgData.id}/"
/>

<p>Inner Width: {innerWidth}</p>
<p>Inner Height: {innerHeight}</p>
<p>condition: {condition}</p>


<style>
	.preview {
		/* min-width: 100%; */
		position: absolute;
        top: 10px;
        left: 10px;
		background-size: cover;
		background-repeat: no-repeat;
	}
	img {
		view-transition-name: var(--viewtransitionkey);
	}
</style>
