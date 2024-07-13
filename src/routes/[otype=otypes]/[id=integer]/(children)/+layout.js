
// Pages below this layout, such as /project/ID or /dataset/ID or /dataset/ID/image/IID
// all need child objects loaded (datasets or images)

export async function load({ fetch, params }) {

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
	const chTypePlural = `${chType}s`;

	let children = [];
	if (chType) {
		const childData = await fetch(`https://idr.openmicroscopy.org/webclient/api/${chTypePlural}/?id=${params.id}`)
			.then(rsp => rsp.json());
		children = childData[chTypePlural];
	}

	return {otype: params.otype, children, chType};
}
