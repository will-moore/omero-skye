
import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

// All pages under e.g. /project/ID need to have the project Name.
export async function load({ fetch, params }) {

	const parentTypes = {
		dataset: "project",
		plate: "screen",
	}

	// NB: JSON api uses e.g. "projects" (plural)
    let urls = [`${BASE_URL}/api/v0/m/${params.otype}s/${params.id}/`];

	if (parentTypes[params.otype]) {
		// https://idr.openmicroscopy.org/api/v0/m/projects/?dataset=830
		urls.push(`${BASE_URL}/api/v0/m/${parentTypes[params.otype]}s/?${params.otype}=${params.id}`);
	}
	const promises = urls.map(url => fetch(url).then(rsp => rsp.json()));
	const data = await Promise.all(promises);
	const jsonData = data[0];

	// https://idr.openmicroscopy.org/api/v0/m/projects/?dataset=830

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

	let result = {obj: jsonData.data, otype: params.otype, chType};

	if (parentTypes[params.otype]) {
		result.parents = data[1].data;
	}

	return result;
}
