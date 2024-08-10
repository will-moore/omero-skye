<script>
	import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

	import { pinch, pan } from 'svelte-hammer'
	// import Hammer from 'hammerjs';

	// const events = [
	// 	'pinch',
	// 	'pinchstart',
	// 	'pinchmove',
	// 	'pinchend',
	// 	'pinchcancel',
	// 	'pinchin',
	// 	'pinchout'
	// ];

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

	$: imgWidth =
		(zoom / 100) * (imgWiderThanViewport ? innerWidth : (innerHeight - THUMBHEIGHT) * imageRatio);
	$: imgHeight =
		(zoom / 100) * (imgWiderThanViewport ? innerWidth / imageRatio : innerHeight - THUMBHEIGHT);

	function handleZoom(incr) {
		console.log('handleZoom', incr);
		// let's just centre the image for now...

		zoom = zoom + incr;
	}

	// function pinch(element) {
	// 	console.log('init PINCH');

	// 	var hammertime = new Hammer(element);
	// 	hammertime.get('pinch').set({ enable: true });
	// 	// hammertime.on('pan', function (ev) {
	// 	// 	console.log(ev);
	// 	// });
	// 	for (const event of events) {
	// 		console.log('add event', event);
	// 		hammertime.on(event, (ev) => {
	// 			console.log('pinch...', event, ev)
	// 			element.dispatchEvent(new CustomEvent(event, { detail: ev }))
	// 	});
	// 	}

	// 	return {
	// 		update(opt) {
	// 			hammertime.get('pinch').set(opt);
	// 		},
	// 		destroy() {
	// 			for (const event of events) {
	// 				hammertime.off(event);
	// 			}
	// 		}
	// 	};
	// }

	

	function scrollposition(node, init_w) {
		// the update() method returned from the scrollposition() action will be called whenever
		// the node element changes, immediately after Svelte has applied updates to the markup
		// https://svelte.dev/docs/element-directives#use-action

		// Used for the main viewer (only when the page loads, not needed subsequently)
		// and also for thumbnails slider when selection changes -> scrolls selected to centre
		const update = (img_w) => {
			// console.log('scrollposition', node, img_w);
			// const item = node.querySelector('.selected');
			// if (item) item.scrollIntoView({ inline: 'center' });

			// let's just centre the image for now...
			const scrollX = (imgWidth - innerWidth) / 2;
			const scrollY = 0;
			// console.log('scrollX', scrollX);
			node.scroll(scrollX, scrollY);
		};
		update();

		return { update };
	}
</script>

<!-- TODO: bind to viewport element instead of window? -->
<svelte:window bind:innerWidth bind:innerHeight />

<div
	class="viewport"
	use:scrollposition={imgWidth}
	use:pinch
	on:pinchstart={({ detail }) => console.log('pinchstart', detail)}
	on:pinchmove={({ detail }) => console.log('pinchmove', detail)}
	on:pinchend={({ detail }) => console.log('pinchend', detail)}
	style:width="{innerWidth}px"
	style:height="{innerHeight}px"
>
	<img
		class="preview"
		style:--viewtransitionkey="image-{imgData.id}"
		style:width="{imgWidth}px"
		style:height="{imgHeight}px"
		alt="Thumbnail of {imgData.meta.Name}"
		src="{BASE_URL}/webclient/render_image/{imgData.id}/"
	/>

	<div class="dims">
		<p>Zoom: {zoom}</p>
		<button on:click={() => handleZoom(10)}>+</button>
		<button on:click={() => handleZoom(-10)}>-</button>
	</div>
</div>

<aside>
	<details>
		<summary> Info {imgData.id} </summary>
		<h1>{imgData.meta.imageName}</h1>
		<h2>Image: {imgData.id}</h2>

		<a href="/image/{imgData.id}/annotations">Annotations</a> |
		<a href="{BASE_URL}/webclient/img_detail/{imgData.id}/">Open in iviewer</a>

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
		border: solid pink 1px;
		overflow: auto;
	}

	.preview {
		/* min-width: 100%; */
		/* position: absolute; */
		/* background-size: cover;
		background-repeat: no-repeat; */
	}
	img {
		view-transition-name: var(--viewtransitionkey);
	}

	.dims,
	aside {
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
