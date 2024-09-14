
<script>
	import MapAnnotationI from "./MapAnnotationI.svelte";
    import FileAnnotationI from "./FileAnnotationI.svelte";
    import TagAnnotationI from "./TagAnnotationI.svelte";

    import {formatDate} from "$lib/util";

    export let ann;


</script>

<details>
    <summary>{formatDate(ann.link.date)}</summary>
    <!-- description list <dl> description term <dt> and details <dd> -->
    <dl>
        <dt>ID</dt><dd>{ann.id}</dd><br>
        <dt>Namespace</dt><dd>{ann.ns}</dd><br>
        <dt>Linked by</dt><dd>{ann.link.owner.firstName} {ann.link.owner.lastName}</dd><br>
        <dt>On</dt><dd>{formatDate(ann.link.date)}</dd>
    </dl>
</details>


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
    details {
        margin-top: 15px;
        background-color: #e0e0e0;
        border-radius: 10px;
    }
    summary {
        padding: 5px;
    }
    dl {
        font-family: Arial, Helvetica, sans-serif;
        background-color: rgb(31, 31, 31);
        color: white;
        padding: 10px;
        border-radius: 0 0 10px 10px;
        overflow: auto;
    }
    dt, dd {
        display: inline;
    }
    dt {
        font-weight: bold;
    }
    dd {
        color: #eee;
    }
    dt:after {
        content: ": "
    }
</style>