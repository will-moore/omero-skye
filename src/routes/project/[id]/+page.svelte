
<script>
	export let data;


	const promise = fetch(`https://idr.openmicroscopy.org/webclient/api/datasets/?id=${data.data['@id']}`)
		.then(rsp => rsp.json());
</script>

<svelte:head>
	<title>Project</title>
	<meta name="description" content="Showing data from OMERO" />
</svelte:head>

<div class="text-column">
	<h1>Project {data.data.Name}</h1>

	{#await promise}
    <div>loading...</div>
  {:then data}
  <ul>
	{#each data.datasets as dataset, i}
		<li><a href="dataset/{dataset.id}">{dataset.name}</a></li>
	{/each}
</ul>
  {:catch error}
  	<span>Failed to load</span>
  {/await}
</div>
