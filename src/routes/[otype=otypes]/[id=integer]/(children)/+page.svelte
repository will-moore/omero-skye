<!-- 
	Url like /project/ID or /dataset/ID or /screen/ID
	/(children)/ group (for loading children) is not included in URL
 -->
<script>
	import Fa from 'svelte-fa';
	import { objUrl, titlecase } from '$lib/util';
	import { faTags, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
	import ContainerObj from '../../../../components/ContainerObj.svelte';
	export let data;
</script>

<svelte:head>
	<title>OMERO {data.obj.Name}</title>
	<meta name="description" content="Showing data from OMERO, {data.otype}: {data.obj.Name}" />
</svelte:head>


<div class="header">
	{#if data.parents}
		<div class="parents">
			{#each data.parents as parent}
				<a href={objUrl(parent)}>
					<Fa icon={faAngleLeft} color="#999" /> {parent['Name']}
				</a>
			{/each}
		</div>
	{/if}
	<div class="row">
		<div class="name">
			<h1>{data.obj.Name}</h1>
		</div>
		<div class="annotations">
			<a href="/{data.otype}/{data.obj['@id']}/annotations">
				<Fa icon={faTags} size="2x" color="#999" />
			</a>
		</div>
	</div>
</div>

<div class="row objId">
	<h3>{titlecase(data.otype)}:{data.obj['@id']}</h3>
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
		padding: 0;
		display: flex;
		flex-direction: row;
		width: 100%;
		max-width: 100%;
		gap: 10px;
	}
	.header {
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 1000;
		border-bottom: solid #ddd 1px;
		padding: 10px;
		padding-bottom: 5px;
	}
	.name {
		flex: auto 1 1;
	}
	.annotations {
		flex: auto 0 0;
	}
	.objId {
		padding: 10px;
		padding-top: 0;
		border-bottom: solid 1px #ddd;
		padding-bottom: 5px;
		margin-top: 0;
	}
	h3 {
		margin-top: 5px;
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
	a {
		text-decoration: none;
		color: grey;
	}
	.parents {
		margin: 0;
	}
	.parents a {
		display: block;
		width: fit-content;
		max-width: 100%;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		overflow: hidden;
		background-color: white;
		border: solid rgb(179, 178, 178) 1px;
		border-radius: 3px;
		padding: 0 3px;
		margin-bottom: 8px;
	}
</style>
