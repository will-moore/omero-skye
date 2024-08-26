<script>
	import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';
	import {pinchAction} from '$lib/util';

	// import { pinch, pan } from 'svelte-hammer'

	export let imgData;

	let innerWidth = 0;
	let innerHeight = 0;

	$: zoom = 100;

	// reset zoom and pan when imgData changes (new Image)
	$: if (imgData.id > 0) {
		zoom = 100;
	}

	$: viewportRatio = innerWidth / innerHeight;
	let imageRatio = imgData.size.width / imgData.size.height;
	$: imgWiderThanViewport = imageRatio > viewportRatio;

	$: imgWidth = (zoom / 100) * (imgWiderThanViewport ? innerWidth : innerHeight * imageRatio);
	$: imgHeight = (zoom / 100) * (imgWiderThanViewport ? innerWidth / imageRatio : innerHeight);

	$: theZ = imgData.rdefs.defaultZ;
	$: theT = imgData.rdefs.defaultT;
	$: renderQuery = `c=${imgData.channels.map(chMarshal).join(",")}&m=c&p=normal&ia=${imgData.rdefs.invertAxis?1:0}&maps=${chMaps(imgData)}`;

	function chMarshal(ch, idx) {
		return `${ch.active ? '' : '-'}${idx + 1}|${ch.window.start}:${ch.window.end}$${ch.color}`;
	}
	function chMaps(imgData) {
		const maps_json = imgData.channels.map(ch => {
			return {'inverted': {'enabled': ch.inverted}}
		});
		return JSON.stringify(maps_json).replace(/ /g, "");
	}

	// point on the image that is at centre of viewport
	// updated on pan!
	let panCentre = { x: 0.5, y: 0.5 };


	function handleScrollEnd(event) {
		// We want to calculate the image coordinates at the centre of the viewport
		// we can use the imageWrapper since it will be same size as the image
		let left = event.target.scrollLeft;
		let top = event.target.scrollTop;
		let wrapperWidth = Math.max(imgWidth, innerWidth);
		let wrapperHeight = Math.max(imgHeight, innerHeight);
		let fractionLeft = (left + (innerWidth / 2)) / wrapperWidth;
		let fractionTop = (top + (innerHeight / 2)) / wrapperHeight;
		// update the centre that we use to update scroll position on pinch (zoom)
		panCentre = { x: fractionLeft, y: fractionTop };
	}

	function handlePinch(event) {
		// don't zoom below 100%
		zoom = Math.max(100, zoom * (event.detail?.ratio || 1));
	}

	function scrollposition(node, init_w) {
		// node change on zoom triggers this action, which updates scrollPosition
		// to keep the panCentre the same as it was before the zoom
		const update = (img_w) => {
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
	on:scrollend={handleScrollEnd}
	style:width="{innerWidth}px"
	style:height="{innerHeight}px"
>
	<!-- ImageWrapper gives the image margin top/bottom so that it is in
	the centre of the viewport when zoomed out -->
	<div
		class="imageWrapper"
		style:background="lightgrey"
		style:width="{Math.max(imgWidth, innerWidth)}px"
		style:height="{Math.max(imgHeight, innerHeight)}px"
	>
		<img
			style:--viewtransitionkey="image-{imgData.id}"
			style:--shrinkHeight="{imgHeight * 0.5}px"
			style:--shrinkWidth="{imgWidth * 0.5}px"
			style:--shrinkLeft="{(innerWidth - (imgWidth * 0.5)) / 2}px"
			style:bottom="{(Math.max(imgHeight, innerHeight) - imgHeight) / 2}px"
			style:width="{imgWidth}px"
			style:height="{imgHeight}px"
			alt="Thumbnail of {imgData.meta.Name}"
			src="{BASE_URL}/webclient/render_image/{imgData.id}/{theZ}/{theT}/?{renderQuery}"
			style:background-image="url('{BASE_URL}/webclient/render_thumbnail/{imgData.id}/')"
		/>
	</div>
	{#if zoom == 100}
		<div class="info" style:height="{innerHeight * 0.7}px">
			<h1>{imgData.meta.imageName}</h1>
			<h2>Image: {imgData.id}</h2>
			<table>
				<tbody>
					<tr><td>Size X/Y:</td><td>{imgData.size.width} x {imgData.size.height}</td></tr>
					<tr><td>Size Z/Time:</td><td>{imgData.size.z} x {imgData.size.t}</td></tr>
					<tr><td>Pixels Type</td><td>{imgData.meta.pixelsType}</td></tr>
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	@keyframes shrink-image {
		from {
			left: 0;
		}
		to {
			bottom: 0;
			width: var(--shrinkWidth);
			height: var(--shrinkHeight);
			left: var(--shrinkLeft);
		}
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.imageWrapper img {
		animation: shrink-image linear forwards;
		animation-timeline: scroll();

		position: absolute;
		bottom: 0;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.imageWrapper {
		position: relative;
		background-color: transparent;
	}
	.viewport {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
		background: lightgrey;
	}

	img {
		view-transition-name: var(--viewtransitionkey);
	}

	.info {
		background-color: white;
		padding: 15px;
		border-radius: 20px 20px 0 0;
		border: transparent;
	}
	.info table {
		animation: fade-in linear forwards;
		animation-timeline: scroll();
	}
</style>
