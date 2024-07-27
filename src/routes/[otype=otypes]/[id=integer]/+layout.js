
import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

// All pages under e.g. /project/ID need to have the project Name.
export async function load({ fetch, params }) {

	// NB: JSON api uses e.g. "projects" (plural)
    let url = `${BASE_URL}/api/v0/m/${params.otype}s/${params.id}/`;
	const res = await fetch(url);
	const jsonData = await res.json();

	// child-type needed on the page for links etc.
	const childTypes = {
		project: "dataset",
		dataset: "image",
		image: "",
		screen: "plate",
		plate: "",
		well: "image"
	}
	const chType = childTypes[params.otype];

	return {obj: jsonData.data, otype: params.otype, chType};
}
