/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    let url = `https://idr.openmicroscopy.org/webclient/api/containers/`;
	const res = await fetch(url);
	const item = await res.json();
    console.log('item', item);
	return item;
}
