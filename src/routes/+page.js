import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params, url }) {
	console.log('url', params, url.searchParams, url.searchParams.get('filter'));

	let fetchUrl = `${BASE_URL}/webclient/api/containers/`;
	const res = await fetch(fetchUrl);
	const item = await res.json();

	item.filter = url.searchParams.get('filter') || '';
	return item;
}
