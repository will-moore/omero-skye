
export async function load({ fetch, params }) {
	console.log('params', params, params.otype);
	// NB: JSON api uses e.g. "projects" (plural)
    let url = `https://idr.openmicroscopy.org/api/v0/m/${params.otype}s/${params.id}/`;
	const res = await fetch(url);
	const jsonData = await res.json();
    console.log('jsonData', jsonData);

	// Load children...
	const childTypes = {
		project: "dataset",
		dataset: "image",
		image: "undefined",
		screen: "plate",
		plate: "well",
		well: "image"
	}
	const chType = childTypes[params.otype];
	const chTypePlural = `${chType}s`;

	const childData = await fetch(`https://idr.openmicroscopy.org/webclient/api/${chTypePlural}/?id=${params.id}`)
			.then(rsp => rsp.json());
	const children = childData[chTypePlural];

	return {obj: jsonData.data, otype: params.otype, children, chType};
}
