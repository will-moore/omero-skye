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
	/** @type {number[]} */
	export let imageIds;
	/** @type {string} */
	export let baseUrl;

	let imgDataByIds = {};
	imgDataByIds[imgData.id] = imgData;

	console.log('imageIds', imageIds);
	console.log('imgData.id', imgData.id, imageIds.indexOf(imgData.id));

	$: imgIndex = imageIds.indexOf(imgData.id);
	$: imgIds = imageIds.slice(imgIndex - 1, imgIndex + 1);

	console.log('imgIndex', imgIndex, 'imgIds', imgIds);

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
		console.log('scrollEnd', evt.target.clientWidth, evt.target.scrollLeft);
		if (evt.target.scrollLeft == 0) {
			// prev
			navigateToImage(imageIds[imgIndex - 1]);
		} else if (evt.target.scrollLeft > evt.target.clientWidth) {
			// next
			navigateToImage(imageIds[imgIndex + 1]);
		}
	}

	async function loadImgData(imageId) {

		if (!imgDataByIds[imageId]) {
			let href = `${baseUrl}${imageId}`;
			const result = await preloadData(href);
			if (result.type === 'loaded' && result.status === 200) {
				console.log("loadImgData ** result ** ", result.data.imgData);
				imgDataByIds[imageId] = result.data.imgData;
			}
		}
		console.log("loadImgData returns ", imgDataByIds[imageId]);
		return imgDataByIds[imageId];
	}

	async function cachePrevNextImgData() {
		loadImgData(imageIds[imgIndex + 1]);
		loadImgData(imageIds[imgIndex - 1]);
	}

	// when component mounts or when imgData changes, cache prev and next
	// onMount(() => {
	// 	console.log("onMount() -> cachePrevNextImgData()")
	// 	cachePrevNextImgData();
	// });
	// when imgData changes...
	$: if (imgData.id > 0) {
		console.log("imgData.id > 0 -> cachePrevNextImgData()")
		cachePrevNextImgData();
	}

	function focus(node) {
		// the update() method returned from the focus() action will be called whenever
		// the node element changes, immediately after Svelte has applied updates to the markup
		// https://svelte.dev/docs/element-directives#use-action
		const update = () => {
			console.log('--- focus().... node', node);
			const item = node.querySelector('.focused-item');
			if (item) item.scrollIntoView({ block: 'center' });
		};
		update();

		return { update };
	}
</script>

<div class="container" use:focus={imgIndex} on:scrollend={handleScrollEnd}>
	{#each imageIds.slice(imgIndex - 1, imgIndex + 2) as iid, key (iid)}
		<div
			class="viewer"
			class:focused-item={key === 1}
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
	}
</style>
