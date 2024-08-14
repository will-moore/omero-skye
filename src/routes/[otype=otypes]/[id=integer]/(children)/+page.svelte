<!-- 
	Url like /project/ID or /dataset/ID or /screen/ID
	/(children)/ group (for loading children) is not included in URL
 -->
<script>
	import Fa from 'svelte-fa'
	import { faTags } from '@fortawesome/free-solid-svg-icons'
	import ContainerObj from '../../../../components/ContainerObj.svelte';
	export let data;

	import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';
</script>

<svelte:head>
	<title>OMERO {data.obj.Name}</title>
	<meta name="description" content="Showing data from OMERO, {data.otype}: {data.obj.Name}" />
</svelte:head>

<div class="row header">
	<div>
		<h1>{data.obj.Name}</h1>
	</div>
	<div class="annotations">
		<a href="/{data.otype}/{data.obj['@id']}/annotations">
			<Fa icon={faTags} size="2x"
			color="#999" />
		</a>
	</div>
</div>
<div class="row objId">
	<h3>{data.otype}:{data.obj['@id']}</h3>
</div>

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
					<ContainerObj
						dataType={data.chType}
						objId={child.id}
						name={child.name}
						childCount={child.childCount}
					/>
				{/if}
			</li>
		{/each}
	</ul>

<style>
	.row {
		padding: 10px;
		display: flex;
		flex-direction: row;
	}
	.header {
		flex: auto 1 1;
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 1000;
	}
	.objId {
		padding-top: 0;
	}
	h1 {
		line-height: normal;
	}
	.annotations {
		flex: 50px 0 0;
		padding: 10px;
	}
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
