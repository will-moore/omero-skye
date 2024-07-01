
export async function load({ fetch, params }) {
	console.log('params', params);
    let url = `https://idr.openmicroscopy.org/api/v0/m/projects/${params.id}/`;
	const res = await fetch(url);
	const jsonData = await res.json();
    console.log('jsonData', jsonData);
	return {data: jsonData.data};
}
