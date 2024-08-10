<script>
	import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

	// import { pinch, pan } from 'svelte-hammer'

	export let imgData;

	let innerWidth = 0;
	let innerHeight = 0;

	let pinchLog = 'ok...';

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

	function pinch(el) {
		console.log('init PINCH', el);

		// From https://mdn.github.io/dom-examples/pointerevents/Pinch_zoom_gestures.html

		// Global vars to cache event state
		var evCache = new Array();
		var prevDiff = -1;

		function pointerdown_handler(ev) {
			// The pointerdown event signals the start of a touch interaction.
			// This event is cached to support 2-finger gestures
			evCache.push(ev);
		}

		function pointermove_handler(ev) {
			console.log('pointermove_handler', ev);
			// This function implements a 2-pointer horizontal pinch/zoom gesture.
			//
			// If the distance between the two pointers has increased (zoom in),
			// the taget element's background is changed to "pink" and if the
			// distance is decreasing (zoom out), the color is changed to "lightblue".
			//
			// This function sets the target element's border to "dashed" to visually
			// indicate the pointer's target received a move event.
			ev.target.style.border = 'dashed';

			// Find this event in the cache and update its record with this event
			for (var i = 0; i < evCache.length; i++) {
				if (ev.pointerId == evCache[i].pointerId) {
					evCache[i] = ev;
					break;
				}
			}

			// If two pointers are down, check for pinch gestures
			console.log('evCache.length', evCache.length);
			if (evCache.length == 2) {
				// Calculate the distance between the two pointers
				var curDiff = Math.sqrt(
					Math.pow(evCache[1].clientX - evCache[0].clientX, 2) +
						Math.pow(evCache[1].clientY - evCache[0].clientY, 2)
				);

				if (prevDiff > 0) {
					if (curDiff > prevDiff) {
						// The distance between the two pointers has increased
						pinchLog = 'Pinch moving OUT -> Zoom in';
						handleZoom(2);
					}
					if (curDiff < prevDiff) {
						// The distance between the two pointers has decreased
						pinchLog = 'Pinch moving IN -> Zoom out';
						handleZoom(-2);
					}
				}

				// Cache the distance for the next move event
				prevDiff = curDiff;
			}
		}

		function pointerup_handler(ev) {
			console.log(ev.type, ev);
			// Remove this pointer from the cache and reset the target's
			// background and border
			remove_event(ev);
			ev.target.style.background = 'white';
			ev.target.style.border = '1px solid black';

			// If the number of pointers down is less than two then reset diff tracker
			if (evCache.length < 2) prevDiff = -1;
		}

		function remove_event(ev) {
			// Remove this event from the target's cache
			for (var i = 0; i < evCache.length; i++) {
				if (evCache[i].pointerId == ev.pointerId) {
					evCache.splice(i, 1);
					break;
				}
			}
		}

		// Install event handlers for the pointer target
		el.onpointerdown = pointerdown_handler;
		el.onpointermove = pointermove_handler;

		// Use same handler for pointer{up,cancel,out,leave} events since
		// the semantics for these events - in this app - are the same.
		el.onpointerup = pointerup_handler;
		el.onpointercancel = pointerup_handler;
		el.onpointerout = pointerup_handler;
		el.onpointerleave = pointerup_handler;

		return {
			update(opt) {},
			destroy() {}
		};
	}

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
		<p>{pinchLog}</p>
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
