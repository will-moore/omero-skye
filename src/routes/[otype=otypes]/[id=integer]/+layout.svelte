
<!-- Not sure we need this +layout.svelte now? -->
<script>
	export let data;
</script>

<svelte:head>
	<title>{data.otype}</title>
	<meta name="description" content="Showing data from OMERO" />
</svelte:head>

<div>
	
    <slot></slot>
	
</div>
