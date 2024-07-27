<script>
	/*
        This component is 3 viewers [prev, current, next] in a scrollable panel,
        with the current one shown initially, so user can scroll to prev or next.
        When they do, it trigges a reload / re-render with the new viewer as current etc.
    */
	import ImageViewer from './ImageViewer/index.svelte';
	import { preloadData, replaceState, goto } from '$app/navigation';

	export let imgData;
	/** @type {number[]} */
	export let imageIds;
	/** @type {string} */
	export let baseUrl;

	let imgDataByIds = {};
	imgDataByIds[imgData.id] = imgData;

	$: imgIndex = imageIds.indexOf(imgData.id);

	/** @type {(imageId: number) => Promise<void>} */
	async function navigateToImage(imageId) {
		let data = await loadImgData(imageId);
		let href = `${baseUrl}${imageId}`;
		if (data) {
			replaceState(href, {});
			imgData = data;
		} else {
			// something bad happened! try navigating
			goto(href);
		}
	}

	function handleScrollEnd(evt) {
		if (evt.target.scrollLeft == 0) {
			// prev
			navigateToImage(imageIds[imgIndex - 1]);
		} else if (evt.target.scrollLeft > evt.target.clientWidth) {
			// next
			navigateToImage(imageIds[imgIndex + 1]);
		} else if (imgIndex == 0 && evt.target.scrollLeft > 0) {
			// next
			navigateToImage(imageIds[imgIndex + 1]);
		}
	}

	async function loadImgData(imageId) {
		if (!imgDataByIds[imageId]) {
			let href = `${baseUrl}${imageId}`;
			const result = await preloadData(href);
			if (result.type === 'loaded' && result.status === 200) {
				imgDataByIds[imageId] = result.data.imgData;
			}
		}
		return imgDataByIds[imageId];
	}

	async function cachePrevNextImgData() {
		loadImgData(imageIds[imgIndex + 1]);
		if (imgIndex > 0) {
			loadImgData(imageIds[imgIndex - 1]);
		}
	}

	// when imgData changes, cache prev and next imgData...
	$: if (imgData.id > 0) {
		cachePrevNextImgData();
	}

	function focus(node) {
		// the update() method returned from the focus() action will be called whenever
		// the node element changes, immediately after Svelte has applied updates to the markup
		// https://svelte.dev/docs/element-directives#use-action
		const update = () => {
			const item = node.querySelector('.focused-item');
			if (item) item.scrollIntoView({ block: 'center' });
		};
		update();

		return { update };
	}
</script>

<div class="container" use:focus={imgIndex} on:scrollend={handleScrollEnd}>

	{#each imageIds.slice(Math.max(imgIndex - 1, 0), imgIndex + 2) as iid, key (iid)}
		<div
			class="viewer"
			class:focused-item={iid === imageIds[imgIndex]}
			style:background-image="url('https://idr.openmicroscopy.org/webclient/render_thumbnail/{iid}/')"
		>
			{#if imgDataByIds[iid]}
				<ImageViewer imgData={imgDataByIds[iid]} />
			{/if}
		</div>
	{/each}
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
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		flex: 0 0 100%;
		scroll-snap-align: center;
		position: relative;
	}
</style>
