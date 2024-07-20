<script>
    
    /*
        This component is 3 viewers [prev, current, next] in a scrollable panel,
        with the current one shown initially, so user can scroll to prev or next.
        When they do, it trigges a reload / re-render with the new viewer as current etc.
    */
	import { onMount } from 'svelte';
	import ImageViewer from './ImageViewer/index.svelte';
	import { preloadData, replaceState, goto } from '$app/navigation';

	export let imgData;
	export let imageIds;
	export let baseUrl;

	$: imgIndex = imageIds.indexOf(imgData.id);

	async function navigateToImage(imageId) {
		let href = `${baseUrl}${imageId}`;
		console.log('href', href);

		const result = await preloadData(href);
		console.log('result', result);

		if (result.type === 'loaded' && result.status === 200) {
			replaceState(href, {});
			imgData = result.data.imgData;
		} else {
			// something bad happened! try navigating
			goto(href);
		}
	}

	function handleScrollEnd(evt) {
		console.log('scrollEnd', evt.target.clientWidth, evt.target.scrollLeft);
		console.log("scrollEnd imgIndex", imgIndex, imageIds);
		if (evt.target.scrollLeft == 0) {
			// prev
			navigateToImage(imageIds[imgIndex - 1]);
		} else if (evt.target.scrollLeft > evt.target.clientWidth) {
			// next
			navigateToImage(imageIds[imgIndex + 1]);
		}
	}

	// when component mounts, scroll to show selected viewer
	onMount(() => {
		document.getElementById('selected')?.scrollIntoView();
	});
	// when imgData changes...
	$: if (imgData.id > 0) {
		document.getElementById('selected')?.scrollIntoView();
	}
</script>

<div class="container" on:scrollend={handleScrollEnd}>
	<div class="viewer prev"
	style:background-image="url('https://idr.openmicroscopy.org/webclient/render_thumbnail/{imageIds[imgIndex - 1]}/')">
		<h1>Previous</h1>
		<h1>{imageIds[imgIndex - 1]}</h1>
	</div>
	<div class="viewer" id="selected">
		<ImageViewer {imgData} />
	</div>
	<div class="viewer next" 
	style:background-image="url('https://idr.openmicroscopy.org/webclient/render_thumbnail/{imageIds[imgIndex + 1]}/')">>
		<h1>Next</h1>
		<h1>{imageIds[imgIndex + 1]}</h1>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
	}
	.viewer {
		background: linear-gradient(
			90deg,
			rgba(2, 0, 36, 1) 0%,
			rgba(9, 9, 121, 1) 35%,
			rgba(0, 212, 255, 1) 100%
		);
		flex: 0 0 100%;
		scroll-snap-align: center;
	}
	#selected {
		background-image: radial-gradient(
			circle 918px at 13.1% 25.5%,
			rgba(249, 107, 107, 1) 0%,
			rgba(247, 231, 172, 1) 48.9%,
			rgba(173, 247, 172, 1) 90%
		);
	}
	.next, .prev {
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>
