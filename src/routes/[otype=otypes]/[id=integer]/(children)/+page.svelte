
<!-- 
	Url like /project/ID or /dataset/ID or /screen/ID
	/(children)/ group (for loading children) is not included in URL
 -->
<script>
	export let data;

	import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

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

	<a href="/{data.otype}/{data.obj['@id']}/annotations">Annotations</a>

	<ul>
		{#each data.children as child}
			<li>
				{#if data.chType == 'image'}
					<a href="/{data.otype}/{data.obj['@id']}/{data.chType}/{child.id}">
						<img
							style:--viewtransitionkey="image-{child.id}"
							class="thumbnail"
							alt="Thumbnail of {child.name}"
							loading="lazy"
							src="{BASE_URL}/webclient/render_thumbnail/{child.id}/"
						/>
						{child.name}
					</a>
				{:else}
					<a href="/{data.chType}/{child.id}">
						{child.name}
						{#if child?.childCount}
							({child.childCount})
						{/if}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>

	.thumbnail {
		width: 48px;
		height: 48px;
	}

	ul {
		padding: 10px;
	}
	li {
		list-style: none;
	}
	a {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 5px 0;
		gap: 5px;
	}
	img {
		view-transition-name: var(--viewtransitionkey);
	}
</style>
