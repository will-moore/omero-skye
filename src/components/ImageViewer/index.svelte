<script>
	import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';
	import { pinchAction } from '$lib/util';
	import ImgdataInfo from './ImgdataInfo.svelte';
	import {RenderingSettings} from '$lib/imgDataStore';
	import RenderControls from './RenderControls.svelte';

	export let imgData;
	export let baseUrl;
	export let showRenderControls;

	let renderSettings = new RenderingSettings(imgData);
	let renderQuery = renderSettings.getQueryString();

	// page width/height - updated on e.g. phone rotation or resize
	let innerWidth = 0;
	let innerHeight = 0;

	$: zoom = 100;

	// reset zoom and pan when imgData changes (new Image)
	$: if (imgData.id > 0) {
		zoom = 100;
	}

	// If zoom is 100%, we fit the Image to Viewport.
	// When zoom increases, recalculate img Width/Height.
	$: viewportRatio = innerWidth / innerHeight;
	let imageRatio = imgData.size.width / imgData.size.height;
	$: imgWiderThanViewport = imageRatio > viewportRatio;

	$: imgWidth = (zoom / 100) * (imgWiderThanViewport ? innerWidth : innerHeight * imageRatio);
	$: imgHeight = (zoom / 100) * (imgWiderThanViewport ? innerWidth / imageRatio : innerHeight);

	$: theZ = imgData.rdefs.defaultZ;
	$: theT = imgData.rdefs.defaultT;

	renderSettings.subscribe(imgData => {
		renderQuery = renderSettings.getQueryString();
	})

	// point on the image that is at centre of viewport - updated on pan!
	let panCentre = { x: 0.5, y: 0.5 };

	function handleScrollEnd(event) {
		// We want to calculate the image coordinates at the centre of the viewport
		// we can use the imageWrapper since it will be same size as the image
		let left = event.target.scrollLeft;
		let top = event.target.scrollTop;
		let wrapperWidth = Math.max(imgWidth, innerWidth);
		let wrapperHeight = Math.max(imgHeight, innerHeight);
		let fractionLeft = (left + innerWidth / 2) / wrapperWidth;
		let fractionTop = (top + innerHeight / 2) / wrapperHeight;
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

	// add keyboard event listener for Up and Down keys to Zoom (mostly for testing)
	const handleKeydown = (evt) => {
		if (evt.key === 'ArrowUp') {
			zoom = zoom * 1.2;
		} else if (evt.key === 'ArrowDown') {
			zoom = Math.max(100, zoom * 0.8);
		}
	};
</script>

<!-- TODO: bind to viewport element instead of window? -->
<svelte:window bind:innerWidth bind:innerHeight on:keydown|preventDefault={handleKeydown} />

<div
	class="viewport scrollbar-hidden"
	use:scrollposition={imgWidth}
	use:pinchAction
	on:pinch={handlePinch}
	on:scrollend={handleScrollEnd}
	style:width="{innerWidth}px"
	style:height="{innerHeight}px"
	style:--bg={showRenderControls ? "black" : "lightgrey"}
>
	<!-- ImageWrapper gives the image margin top/bottom so that it is in
	the centre of the viewport when zoomed out -->
	<div
		class="imageWrapper"
		style:width="{Math.max(imgWidth, innerWidth)}px"
		style:height="{Math.max(imgHeight, innerHeight)}px"
	>
		<!-- image class used to determine target of click
			TODO: improve decoupling -->
		<img
			class="image"
			class:scroll_shrink={zoom == 100}
			style:--viewtransitionkey="image-{imgData.id}"
			style:--shrinkHeight="{imgHeight * 0.5}px"
			style:--shrinkWidth="{imgWidth * 0.5}px"
			style:--shrinkLeft="{(innerWidth - imgWidth * 0.5) / 2}px"
			style:bottom="{(Math.max(imgHeight, innerHeight) - imgHeight) / 2}px"
			style:width="{imgWidth}px"
			style:height="{imgHeight}px"
			style:left="{(Math.max(imgWidth, innerWidth) - imgWidth) / 2}px"
			alt="Thumbnail of {imgData.meta.Name}"
			src="{BASE_URL}/figure/render_scaled_region/{imgData.id}/{theZ}/{theT}/?{renderQuery}"
			style:background-image="url('{BASE_URL}/webclient/render_thumbnail/{imgData.id}/')"
		/>
	</div>
	{#if zoom == 100}
		<div class="info" style:height="{innerHeight * 0.7}px">
			<ImgdataInfo {imgData} {baseUrl}/>
		</div>
	{/if}

	<RenderControls {renderSettings} {showRenderControls} />
</div>

<style>
	@keyframes shrink-image {
		from {
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
		position: absolute;

		/* background image thumbnail placeholder */
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	img.scroll_shrink {
		animation: shrink-image linear forwards;
		animation-timeline: scroll();
	}

	.imageWrapper {
		position: relative;
		scroll-snap-align: end;
		background-color: var(--bg);
		transition: background-color 0.3s ease-in-out;
	}
	.viewport {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: var(--bg);
		transition: background-color 0.3s ease-in-out;
		scroll-snap-type: y mandatory
	}

	img {
		view-transition-name: var(--viewtransitionkey);
	}

	.info {
		background-color: white;
		padding: 15px;
		border-radius: 20px 20px 0 0;
		border: transparent;
		scroll-snap-align: end;
		overflow: auto;
	}


	/* Hide scrollbar for Chrome, Safari and Opera */
	.scrollbar-hidden::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge add Firefox */
	.scrollbar-hidden {
		-ms-overflow-style: none;
		scrollbar-width: none; /* Firefox */
	}
</style>
