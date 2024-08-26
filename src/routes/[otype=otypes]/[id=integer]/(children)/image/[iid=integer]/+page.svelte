<script>
	import Fa from 'svelte-fa';
	import { faTags, faAngleLeft} from '@fortawesome/free-solid-svg-icons';

	import Carousel from '../../../../../../components/Carousel.svelte';
	
	export let data;

	$: iids = data.children.map((ch) => ch.id);
</script>

<svelte:head>
	<title>OMERO {data.imgData.meta.imageName}</title>
	<meta name="description" content="Showing data from OMERO, {data.otype}: {data.obj.Name}" />
</svelte:head>


	<Carousel
		imgData={data.imgData}
		imageIds={iids}
		baseUrl="/{data.otype}/{data.obj['@id']}/{data.chType}/"
	/>


<div class="back">
	<a href="/{data.otype}/{data.obj['@id']}">
		<Fa icon={faAngleLeft} color="#999" size="lg" />
	</a>
</div>

<style>
	.back {
		position: fixed;
		left: 10px;
		top: 10px;
		background-color: white;
		padding: 10px;
		border-radius: 5px;
	}
</style>
