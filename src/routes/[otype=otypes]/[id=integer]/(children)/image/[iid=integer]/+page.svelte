<script>
	import Carousel from '../../../../../../components/Carousel.svelte';

	export let data;

	$: iids = data.children.map((ch) => ch.id);
</script>

<div class="fullpage">
	<Carousel
		imgData={data.imgData}
		imageIds={iids}
		baseUrl="/{data.otype}/{data.obj['@id']}/{data.chType}/"
	/>
</div>

<div class="back">
	<a href="/{data.otype}/{data.obj['@id']}">Back to Dataset</a>
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
		left: 10px;
		top: 10px;
		background-color: white;
		padding: 10px;
	}
</style>
