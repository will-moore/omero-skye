
<script>
	import MapAnnotationI from "./MapAnnotationI.svelte";
    import FileAnnotationI from "./FileAnnotationI.svelte";

    export let ann;


</script>

<p>
    ID: {ann.id}
</p>
<p>
    Namespace: {ann.ns}
</p>
<p>
    Linked by: {ann.link.owner.firstName} {ann.link.owner.lastName}
</p>


    {#if ann.class == "MapAnnotationI"}
        <MapAnnotationI {ann} />
    {/if}

    {#if ann.class == "FileAnnotationI"}
        <FileAnnotationI {ann} />
    {/if}

