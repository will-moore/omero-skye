<script>
	import Carousel from '../../../../../../components/Carousel.svelte';

	export let data;

	$: iids = data.children.map((ch) => ch.id);
</script>

<svelte:head>
	<title>OMERO {data.imgData.meta.name}</title>
	<meta name="description" content="Showing data from OMERO, {data.otype}: {data.obj.Name}" />
</svelte:head>


	<Carousel
		imgData={data.imgData}
		imageIds={iids}
		baseUrl="/{data.otype}/{data.obj['@id']}/{data.chType}/"
	/>


<div class="back">
	<a href="/{data.otype}/{data.obj['@id']}">Back to Dataset</a>
</div>

<style>
	.back {
		position: fixed;
		left: 10px;
		top: 10px;
		background-color: white;
		padding: 10px;
	}
</style>
