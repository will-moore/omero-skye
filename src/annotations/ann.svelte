
<script>
	import MapAnnotationI from "./MapAnnotationI.svelte";
    import FileAnnotationI from "./FileAnnotationI.svelte";
    import TagAnnotationI from "./TagAnnotationI.svelte";

    import {formatDate} from "$lib/util";

    export let ann;


</script>

<p>
    ID: {ann.id} <br>
    Namespace: {ann.ns} <br>
    Linked by: {ann.link.owner.firstName} {ann.link.owner.lastName} <br>
    On: {formatDate(ann.link.date)}
</p>


    {#if ann.class == "MapAnnotationI"}
        <MapAnnotationI {ann} />
    {/if}

    {#if ann.class == "FileAnnotationI"}
        <FileAnnotationI {ann} />
    {/if}

    {#if ann.class == "TagAnnotationI"}
        <TagAnnotationI {ann} />
    {/if}

<style>
    p {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 80%;
    }
</style>