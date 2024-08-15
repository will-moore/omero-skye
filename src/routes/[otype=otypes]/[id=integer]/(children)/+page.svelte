<!-- 
	Url like /project/ID or /dataset/ID or /screen/ID
	/(children)/ group (for loading children) is not included in URL
 -->
<script>
	import Fa from 'svelte-fa'
	import { faTags } from '@fortawesome/free-solid-svg-icons'
	import ContainerObj from '../../../../components/ContainerObj.svelte';
	export let data;
</script>

<svelte:head>
	<title>OMERO {data.obj.Name}</title>
	<meta name="description" content="Showing data from OMERO, {data.otype}: {data.obj.Name}" />
</svelte:head>

<div class="row header">
	<div class="name">
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
				<ContainerObj
					dataType={data.chType}
					objId={child.id}
					name={child.name}
					childCount={child.childCount}
					parentType={data.otype}
					parentId={data.obj['@id']}
				/>
			</li>
		{/each}
	</ul>

<style>
	.row {
		padding: 10px;
		display: flex;
		flex-direction: row;
		width: 100%;
		max-width: 100%;
		gap: 10px;
	}
	.header {
		flex: auto 1 1;
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 1000;
	}
	.name {
		flex: auto 1 1;
	}
	.annotations {
		flex: auto 0 0;
	}
	.objId {
		padding-top: 0;
	}
	h1 {
		line-height: normal;
		line-break: anywhere;
	}

	ul {
		padding: 10px;
	}
	li {
		list-style: none;
	}
</style>
