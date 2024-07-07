
export async function load({ fetch, params }) {
	console.log('layout.js params', params, params.otype);
	// NB: JSON api uses e.g. "projects" (plural)
    let url = `https://idr.openmicroscopy.org/api/v0/m/${params.otype}s/${params.id}/`;
	const res = await fetch(url);
	const jsonData = await res.json();
    console.log('jsonData', jsonData);

	// Load children...
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
