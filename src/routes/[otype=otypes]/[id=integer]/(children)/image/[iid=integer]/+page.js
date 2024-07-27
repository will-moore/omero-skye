import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

export async function load({ fetch, params }) {
	// Load image info
    let url = `${BASE_URL}/webclient/imgData/${params.iid}/`;
	const res = await fetch(url);
	const imgData = await res.json();
    console.log('imgData', imgData);

	return {imgData, params};
}
