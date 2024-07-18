<script>

    import { onMount } from 'svelte';

    import ImageViewer from "./ImageViewer/index.svelte";
	export let imgData;

    function handleScrollEnd(evt) {
        console.log("scrollEnd", evt, evt.target.scrollLeft);
    }

    // when imgData changes...
    $: if (imgData.id > 0) {
        document.getElementById("selected")?.scrollIntoView();
    }
    onMount(() => {
        document.getElementById("selected")?.scrollIntoView();
    });

</script>

<div class="container" on:scrollend={handleScrollEnd}>
    <div class="viewer prev">
        <ImageViewer {imgData} />
    </div>
    <div class="viewer" id="selected">
        <ImageViewer {imgData} />
    </div>
    <div class="viewer next">
        <ImageViewer {imgData} />
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
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
        flex: 0 0 100%;
        scroll-snap-align: center;
    }
    #selected {
        background-image: radial-gradient( circle 918px at 13.1% 25.5%,  rgba(249,107,107,1) 0%, rgba(247,231,172,1) 48.9%, rgba(173,247,172,1) 90% );
    }
    .next {
        background-image: linear-gradient( 68.6deg,  rgba(79,183,131,1) 14.4%, rgba(254,235,151,1) 92.7% );
     }
    .prev {
        background-image: linear-gradient( 89.5deg,  rgba(131,204,255,1) 0.4%, rgba(66,144,251,1) 100.3% );
     }
	
</style>
