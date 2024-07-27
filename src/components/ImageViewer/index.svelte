<script>
    import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

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
<img
	class="preview"
	style:--viewtransitionkey="image-{imgData.id}"
	style:background-image="url('{BASE_URL}/webclient/render_thumbnail/{imgData.id}/')"
	style:width="{imgWidth}px"
	style:height="{imgHeight}px"
	style:left="{(-(imgWidth - innerWidth) / 2) + dx}px"
	style:top="{(-(imgHeight - (innerHeight - THUMBHEIGHT)) / 2) + dy}px"
	alt="Thumbnail of {imgData.meta.Name}"
	src="{BASE_URL}/webclient/render_image/{imgData.id}/"
/>


<div class="dims">
    <p>Zoom: {zoom}</p>
    <button on:click={() =>zoom += 10}>+</button>
    <button on:click={() =>zoom -= 10}>-</button>
</div>
</div>

<aside>
	<details>
		<summary> Info {imgData.id} </summary>
		<h1>{imgData.meta.imageName}</h1>
		<h2>Image: {imgData.id}</h2>

		<a href="/image/{imgData.id}/annotations">Annotations</a> |
		<a href="{BASE_URL}/webclient/img_detail/{imgData.id}/"
			>Open in iviewer</a
		>

		<table>
			<tbody>
				<tr><td>Size X/Y:</td><td>{imgData.size.width} x {imgData.size.height}</td></tr>
                <tr><td>Size Z/Time:</td><td>{imgData.size.z} x {imgData.size.t}</td></tr>
                <tr><td>Pixels Type</td><td>{imgData.meta.pixelsType}</td></tr>
			</tbody>
		</table>
	</details>
</aside>

<style>
    .viewport {
        position: relative;
        width: 100%;
        height: 100%;
        /* border: solid green 1px; */
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

	.dims, aside {
		position: absolute;
        top: 100px;
        background-color: white;
        padding: 10px;
	}

    .dims {
        left: 10px;
    }
    aside {
        top: 10px;
        right: 10px;
        max-width: calc(100% - 20px);
    }
</style>
