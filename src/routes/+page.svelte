<script>
	import { page } from '$app/stores';
	import ContainerObj from '../components/ContainerObj.svelte';
	import Fa from 'svelte-fa';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import { replaceState } from '$app/navigation';

	export let data;

	// Local filter state that syncs with the input field
	let filter = data.filter;

	function clearFilter() {
		filter = '';
		updateFilter();
	}

	// Function to update URL searchParams when filter changes
	function updateFilter() {
		const params = new URLSearchParams($page.url.search);
		if (filter) {
			params.set('filter', filter);
		} else {
			params.delete('filter');
		}

		// Update the URL without reloading the page
		replaceState(`${window.location.pathname}?${params.toString()}`, {});
	}

	/**
	 * Filters the projects based on the provided filter string.
	 * @param {string} filter - The filter string to apply.
	 * @returns {Array} - The filtered projects.
	 */
	$: projects = data.projects.filter((project) =>
		project.name.toLowerCase().includes(filter.toLowerCase())
	);
	$: screens = data.screens.filter((screen) =>
		screen.name.toLowerCase().includes(filter.toLowerCase())
	);

	$: projectsFilterMsg =
		filter.length > 0
			? `Showing ${projects.length} out of ${data.projects.length} Projects`
			: `Projects (${projects.length})`;
	$: screensFilterMsg =
		filter.length > 0
			? `Showing ${screens.length} out of ${data.screens.length} Screens`
			: `Screens (${screens.length})`;
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

<div class="filter">
	<input bind:value={filter} on:input={updateFilter} placeholder="Filter by Name" />
	<button on:click={clearFilter} title="Clear filter text">
		<Fa icon={faXmark} color="#666" size="lg" />
	</button>
</div>

<div>
	<h3>{projectsFilterMsg}</h3>
	<ul>
		{#each projects as project}
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
	<h3>{screensFilterMsg}</h3>
	<ul>
		{#each screens as screen}
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
	.header,
	.filter {
		padding: 10px;
	}

	.filter {
		position: sticky;
		top: 0;
		background-color: white;
		display: flex;
		flex-direction: row;
		gap: 10px;
		z-index: 1000;
	}
	.filter input {
		flex: auto 1 1;
		height: 30px;
	}
	.filter button {
		flex: 30px 0 0;
		border: none;
		background-color: transparent;
	}

	h3 {
		position: sticky;
		top: 40px;
		background-color: white;
		z-index: 10;
	}
	h3,
	ul {
		padding: 10px;
	}

	li {
		list-style: none;
	}
</style>
