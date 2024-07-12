<script>

    import Ann from '../../../../annotations/ann.svelte';
	export let data;
</script>

<div class="header">
	<h1>{data.obj.Name}</h1>
	<h2>{data.otype}:{data.obj['@id']}</h2>
</div>

<a href="/{data.otype}/{data.obj['@id']}">Back to {data.otype}</a>

<h3>Annotations</h3>

{#each Object.keys(data.annotations) as annType}
	<h3>{annType}</h3>
	<ul>
		{#each data.annotations[annType] as ann}
			<li>
				<Ann {ann} />
			</li>
		{/each}
	</ul>
{/each}
