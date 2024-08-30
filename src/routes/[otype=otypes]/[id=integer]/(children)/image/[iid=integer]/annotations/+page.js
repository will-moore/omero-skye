import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';
import {marshalAnnotations} from '$lib/util.js';

export async function load({ fetch, params }) {

    console.log("para", params)

    const url = `${BASE_URL}/webclient/api/annotations/?image=${params.iid}`;
    const res = await fetch(url);
	const data = await res.json();

    const annotations = marshalAnnotations(data);

    let {otype, id, iid} = params;
	return {annotations, otype, id, iid};
}
