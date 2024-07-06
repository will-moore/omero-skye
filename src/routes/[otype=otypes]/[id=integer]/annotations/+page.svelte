<script>

    import Ann from '../../../../annotations/ann.svelte';
	export let data;
</script>

<h1>Annotations</h1>

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
