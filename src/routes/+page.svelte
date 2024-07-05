<script>
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

<h3>Projects</h3>
<ul>
	{#each data.projects as project}
		<li><a href="project/{project.id}">{project.name} ({project.childCount})</a></li>
	{/each}
</ul>

<h3>Screens</h3>
<ul>
	{#each data.screens as screen}
		<li><a href="screen/{screen.id}">{screen.name} ({screen.childCount})</a></li>
	{/each}
</ul>

<style>
	.header {
		margin: 10px;
	}

	h3, ul {
		padding: 10px;
	}

	li {
		list-style: none;
	}
</style>
