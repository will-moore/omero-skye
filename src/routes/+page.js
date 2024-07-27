import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    let url = `${BASE_URL}/webclient/api/containers/`;
	const res = await fetch(url);
	const item = await res.json();
    console.log('item', item);
	return item;
}
