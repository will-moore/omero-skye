<script>
	import Fa from 'svelte-fa';
	import { faTags, faAngleLeft} from '@fortawesome/free-solid-svg-icons';

	import Carousel from '../../../../../../components/Carousel.svelte';
	
	export let data;

	let showRenderControls = false;

	$: iids = data.children.map((ch) => ch.id);
</script>

<svelte:head>
	<title>OMERO {data.imgData.meta.imageName}</title>
	<meta name="description" content="Showing data from OMERO, {data.otype}: {data.obj.Name}" />
</svelte:head>


	<Carousel
		bind:showRenderControls
		imgData={data.imgData}
		imageIds={iids}
		baseUrl="/{data.otype}/{data.obj['@id']}/{data.chType}/"
	/>


	<!-- If we show Rendering controls, we HIDE the Back button -->
<div class="back" style:top={showRenderControls ? '-60px' : '10px'} >
	<a href="/{data.otype}/{data.obj['@id']}">
		<Fa icon={faAngleLeft} color="#999" size="lg" />
	</a>
</div>

<style>
	.back {
		position: fixed;
		left: 10px;
		background-color: white;
		padding: 10px;
		border-radius: 5px;
		transition: top 0.3s ease-in-out;
	}
</style>
