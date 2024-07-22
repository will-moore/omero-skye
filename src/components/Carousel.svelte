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
		let href = `${baseUrl}${imageId}`;
		console.log('href', href);

		if (imgDataByIds[imageId]) {
			console.log('Use cached imgData', imgDataByIds[imageId]);
			imgData = imgDataByIds[imageId];
			replaceState(href, {});
			return;
		}

		const result = await preloadData(href);
		console.log('result', result);
		if (result.type === 'loaded' && result.status === 200) {
			replaceState(href, {});
			console.log('Updating imgData...');
			imgData = result.data.imgData;
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

	// when component mounts, scroll to show selected viewer
	onMount(() => {
		document.getElementById(`viewer_1`)?.scrollIntoView();
	});
	// when imgData changes...
	$: if (imgData.id > 0) {
		console.log('imgData update -> scrollIntoView()', imgData.id);
		imgDataByIds[imgData.id] = imgData;
		console.log('imgDataByIds', imgDataByIds);
		document.getElementById(`viewer_1`)?.scrollIntoView();
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
