<script>
	import ContainerObj from '../components/ContainerObj.svelte';
	export let data;
</script>

<svelte:head>
	<title>OMERO-skye</title>
	<meta name="description" content="OMERO web app" />
</svelte:head>

<div class="header">
	<h1>Welcome to OMERO-skye</h1>
	<p>A mobile-friendly app for browsing OMERO data, built with SvelteKit.</p>
	<p>Browsing data from IDR...</p>
</div>

<div>
	<h3>Projects</h3>
	<ul>
		{#each data.projects as project}
			<li>
				<ContainerObj
					dataType={'project'}
					objId={project.id}
					name={project.name}
					childCount={project.childCount}
				/>
			</li>
		{/each}
	</ul>
</div>

<div>
	<h3>Screens</h3>
	<ul>
		{#each data.screens as screen}
			<li>
				<ContainerObj
					dataType={'screen'}
					objId={screen.id}
					name={screen.name}
					childCount={screen.childCount}
				/>
			</li>
		{/each}
	</ul>
</div>

<style>
	.header {
		margin: 10px;
	}

	h3 {
		position: sticky;
		top: 0;
		background-color: white;
	}
	h3,
	ul {
		padding: 10px;
	}

	li {
		list-style: none;
	}
</style>
