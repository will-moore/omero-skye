
import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';
import {marshalAnnotations} from '$lib/util.js';

export async function load({ fetch, params }) {

    const url = `${BASE_URL}/webclient/api/annotations/?${params.otype}=${params.id}`;
    const res = await fetch(url);
	const data = await res.json();

    const annotations = marshalAnnotations(data);
	return {annotations};
}
