<script>
	export let imgData;

	let innerWidth = 0;
	let innerHeight = 0;

	$: condition = innerWidth * 1.33 <= innerHeight;
    $: imgWidth = innerWidth - 10;
</script>

<svelte:window bind:innerWidth bind:innerHeight />


<img
	class="preview"
	style:--viewtransitionkey="image-{imgData.id}"
	style:background-image="url('https://idr.openmicroscopy.org/webclient/render_thumbnail/{imgData.id}/')"
    style:width="100px"
    style:height="100px"
	alt="Thumbnail of {imgData.meta.Name}"
	src="https://idr.openmicroscopy.org/webclient/render_thumbnail/{imgData.id}/"
/>

<p>.</p>
<p>.</p>
<p>Inner Width: {innerWidth}</p>
<p>Inner Height: {innerHeight}</p>
<p>condition: {condition}</p>


<style>
	.preview {
		/* min-width: 100%; */
		position: absolute;
        top: 100px;
        left: 100px;
		background-size: cover;
		background-repeat: no-repeat;
	}
	img {
		view-transition-name: var(--viewtransitionkey);
	}
</style>
