
import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';


/** @type {(text: string) => string} */
export function titlecase(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/** @type {(apiObj: any) => string} */
export function objUrl(apiObj) {
    const dtype = apiObj["@type"];
    // "http://www.openmicroscopy.org/Schemas/OME/2016-06#Dataset"
    const objType = dtype.substr(dtype.lastIndexOf("#") + 1).toLowerCase();
    return `/${objType}/${apiObj['@id']}/`;
}
