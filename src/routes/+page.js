import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params, url }) {

	let fetchUrl = `${BASE_URL}/webclient/api/containers/`;
	const res = await fetch(fetchUrl);
	const item = await res.json();

	// Using Sveltekit's API to get the filter like this doesn't give the current
	// value if you're e.g. using Back button to return to the page
	// item.filter = url.searchParams.get('filter') || '';
	// So we do it manually...
	item.filter = (new URLSearchParams(window.location.search.substring(1))).get("filter") || "";
	return item;
}
