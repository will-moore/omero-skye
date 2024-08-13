<script>
	import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

	// import { pinch, pan } from 'svelte-hammer'

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

	$: viewportRatio = innerWidth / innerHeight;
	let imageRatio = imgData.size.width / imgData.size.height;
	$: imgWiderThanViewport = imageRatio > viewportRatio;

	$: imgWidth = (zoom / 100) * (imgWiderThanViewport ? innerWidth : innerHeight * imageRatio);
	$: imgHeight = (zoom / 100) * (imgWiderThanViewport ? innerWidth / imageRatio : innerHeight);

	// point on the image that is at centre of viewport
	// TODO: update this on pan!
	let panCentre = { x: 0.5, y: 0.5 };


	function handlePinch(event) {
		// don't zoom below 100%
		zoom = Math.max(100, zoom * (event.detail?.ratio || 1));
	}

	function pinchAction(el) {
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
			ev.preventDefault();

			// This function implements a 2-pointer horizontal Action/zoom gesture.
			// Find this event in the cache and update its record with this event
			for (var i = 0; i < evCache.length; i++) {
				if (ev.pointerId == evCache[i].pointerId) {
					evCache[i] = ev;
					break;
				}
			}

			// If two pointers are down, check for pinch gestures
			if (evCache.length == 2) {
				// Calculate the distance between the two pointers
				var curDiff = Math.sqrt(
					Math.pow(evCache[1].clientX - evCache[0].clientX, 2) +
						Math.pow(evCache[1].clientY - evCache[0].clientY, 2)
				);

				if (prevDiff > 0) {
					el.dispatchEvent(new CustomEvent('pinch', { detail: { ratio: curDiff / prevDiff } }));
				}

				// Cache the distance for the next move event
				prevDiff = curDiff;
			}
			return false;
		}

		function pointerup_handler(ev) {
			// Remove this pointer from the cache
			remove_event(ev);
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
			destroy() {
				// element destroyed, remove listeners
				el.removeEventListener('pointerdown', pointerdown_handler);
				el.removeEventListener('pointermove', pointermove_handler);
				let evts = ['pointerup', 'pointercancel', 'pointerout', 'pointerleave'];
				for (const evtName of evts) {
					el.removeEventListener(evtName, pointerup_handler);
				}
			}
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
			// NB: scrollX and scrollY may be negative and therefore ignored
			const scrollX = panCentre.x * imgWidth - innerWidth * 0.5;
			const scrollY = panCentre.y * imgHeight - innerHeight * 0.5;
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
	use:pinchAction
	on:pinch={handlePinch}
	style:width="{innerWidth}px"
	style:height="{innerHeight}px"
>
	<!-- ImageWrapper gives the image margin top/bottom so that it is in
	the centre of the viewport when zoomed out -->
	<div
		class="imageWrapper"
		style:width="{Math.max(imgWidth, innerWidth)}px"
		style:height="{Math.max(imgHeight, innerHeight)}px"
	>
		<img
			style:--viewtransitionkey="image-{imgData.id}"
			style:width="{imgWidth}px"
			style:height="{imgHeight}px"
			alt="Thumbnail of {imgData.meta.Name}"
			src="{BASE_URL}/webclient/render_image/{imgData.id}/"
		/>
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
	.imageWrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
	}
	.viewport {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	img {
		view-transition-name: var(--viewtransitionkey);
	}

	aside {
		position: absolute;
		top: 10px;
		right: 10px;
		max-width: calc(100% - 20px);
		background-color: white;
		padding: 10px;
	}
</style>
