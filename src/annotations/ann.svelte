
<script>
	import MapAnnotationI from "./MapAnnotationI.svelte";
    import FileAnnotationI from "./FileAnnotationI.svelte";

    export let ann;

</script>

<p>
    Ann {ann.class} {ann.id}

    {#if ann.class == "MapAnnotationI"}
        <MapAnnotationI {ann} />
    {/if}

    {#if ann.class == "FileAnnotationI"}
        <FileAnnotationI {ann} />
    {/if}
</p>
