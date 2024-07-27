
// Pages below this layout, such as /project/ID or /dataset/ID or /dataset/ID/image/IID
// all need child objects loaded (datasets or images)

import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

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
		const childData = await fetch(`${BASE_URL}/webclient/api/${chTypePlural}/?id=${params.id}`)
			.then(rsp => rsp.json());
		children = childData[chTypePlural];
	}

	return {otype: params.otype, children, chType};
}
