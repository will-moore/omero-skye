
export async function load({ fetch, params }) {
	// Load image info
    let url = `https://idr.openmicroscopy.org/webclient/imgData/${params.iid}/`;
	const res = await fetch(url);
	const imgData = await res.json();
    console.log('imgData', imgData);

	return {imgData, params};
}
