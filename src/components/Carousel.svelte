<script>

    import ImageViewer from "./ImageViewer/index.svelte";
	export let imgData;

</script>

<div class="container">
    <ImageViewer {imgData} />
    <ImageViewer {imgData} />
    <ImageViewer {imgData} />
</div>

<style>
	.container {
        /* border: solid red 1px; */
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
	}
	
</style>
