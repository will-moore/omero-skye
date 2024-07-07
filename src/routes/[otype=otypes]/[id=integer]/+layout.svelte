<script>
	export let data;
</script>

<svelte:head>
	<title>{data.otype}</title>
	<meta name="description" content="Showing data from OMERO" />
</svelte:head>

<div class="text-column">
	<div class="header">
		<h1>{data.obj.Name}</h1>
		<h2>{data.otype}:{data.obj['@id']}</h2>
	</div>

    <slot></slot>
	
</div>

<style>
	.header {
		padding: 10px;
	}

	a {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 5px 0;
		gap: 5px;
	}
</style>
