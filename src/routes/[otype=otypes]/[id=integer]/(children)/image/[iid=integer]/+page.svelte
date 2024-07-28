<script>
	import Carousel from "../../../../../../components/Carousel.svelte";
	import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

	export let data;

	console.log('Image data', data);

	// This is bound to child Carousel
	let imgData = data.imgData;

	$: iids = data.children.map(ch => ch.id);
	$: imgIndex = iids.indexOf(data.imgData.id);
	console.log("imgIndex", imgIndex);
</script>

<div class="fullpage">
	<div class="imgviewer">
		<Carousel
			bind:imgData={imgData}
			imageIds={iids}
			baseUrl="/{data.otype}/{data.obj['@id']}/{data.chType}/"
		/>
	</div>

	<div class="thumbnails">
		{#each data.children as child (child.id)}
			<a href="/{data.otype}/{data.obj['@id']}/{data.chType}/{child.id}"
			data-sveltekit-replacestate
			>
				<img
					class="thumbnail"
					class:selected={child.id == imgData.id}
					loading="lazy"
					alt="Thumbnail of {child.name}"
					src="{BASE_URL}/webclient/render_thumbnail/{child.id}/"
				/>
			</a>
		{/each}
	</div>
</div>


<div class="back">
	<a href="/{data.otype}/{data.obj['@id']}">Back to Dataset</a>

	<!--
		// these don't get updated when we swipe through images
	<a href="/{data.otype}/{data.obj['@id']}/{data.chType}/{iids[imgIndex - 1]}">Prev</a>
	<a href="/{data.otype}/{data.obj['@id']}/{data.chType}/{iids[imgIndex + 1]}">Next</a>
    -->

</div>

<style>
	.fullpage {
		position: fixed;
		inset: 0;
		background-color: lightgrey;
		display: flex;
		flex-direction: column;
	}

	.back {
		position: fixed;
		top: 10px;
		background-color: white;
		padding: 10px;
	}
	.back {
		left: 10px;
	}

	.thumbnails {
		display: flex;
		overflow-x: scroll;
		flex: 0 1 54px;
		z-index: 1;
		background: white;
	}

	.thumbnail {
		max-width: 48px;
		max-height: 48px;
		margin: 3px;
	}
	.selected {
		border: solid red 5px;
	}

	.imgviewer {
		flex: 1 0 auto;
	}
</style>
