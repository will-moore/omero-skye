
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

// Format a date like "2015-06-15 12:08:01"
/** @type {(text: string) => string} */
export function formatDate(date) {
    if (!date) {
        return "";
    }
    /** @type {(number: number) => string} */
    function padZero(number) {
        var n = "" + number;
        if (n.length < 2) {
            n = "0" + n;
        }
        return n;
    }
    // We format for localtime.
    var d = new Date(date),
        dt = [d.getFullYear(), padZero(d.getMonth()+1), padZero(d.getDate())].join("-"),
        tm = [padZero(d.getHours()), padZero(d.getMinutes()), padZero(d.getSeconds())].join(":");
    return dt + " " + tm;
};
