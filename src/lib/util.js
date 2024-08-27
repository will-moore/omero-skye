
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


export function pinchAction(el) {
    // From https://mdn.github.io/dom-examples/pointerevents/Pinch_zoom_gestures.html

    // Global vars to cache event state
    var evCache = new Array();
    var prevDiff = -1;

    function pointerdown_handler(ev) {
        // The pointerdown event signals the start of a touch interaction.
        // This event is cached to support 2-finger gestures
        evCache.push(ev);
    }

    function pointermove_handler(ev) {
        ev.preventDefault();

        // This function implements a 2-pointer horizontal Action/zoom gesture.
        // Find this event in the cache and update its record with this event
        for (var i = 0; i < evCache.length; i++) {
            if (ev.pointerId == evCache[i].pointerId) {
                evCache[i] = ev;
                break;
            }
        }

        // If two pointers are down, check for pinch gestures
        if (evCache.length == 2) {
            // Calculate the distance between the two pointers
            var curDiff = Math.sqrt(
                Math.pow(evCache[1].clientX - evCache[0].clientX, 2) +
                    Math.pow(evCache[1].clientY - evCache[0].clientY, 2)
            );

            if (prevDiff > 0) {
                el.dispatchEvent(new CustomEvent('pinch', { detail: { ratio: curDiff / prevDiff } }));
            }

            // Cache the distance for the next move event
            prevDiff = curDiff;
        }
        return false;
    }

    function pointerup_handler(ev) {
        // Remove this pointer from the cache
        remove_event(ev);
        // If the number of pointers down is less than two then reset diff tracker
        if (evCache.length < 2) prevDiff = -1;
    }

    function remove_event(ev) {
        // Remove this event from the target's cache
        for (var i = 0; i < evCache.length; i++) {
            if (evCache[i].pointerId == ev.pointerId) {
                evCache.splice(i, 1);
                break;
            }
        }
    }

    // Install event handlers for the pointer target
    el.onpointerdown = pointerdown_handler;
    el.onpointermove = pointermove_handler;
    // Use same handler for pointer{up,cancel,out,leave} events since
    // the semantics for these events - in this app - are the same.
    el.onpointerup = pointerup_handler;
    el.onpointercancel = pointerup_handler;
    el.onpointerout = pointerup_handler;
    el.onpointerleave = pointerup_handler;

    return {
        update(opt) {},
        destroy() {
            // element destroyed, remove listeners
            el.removeEventListener('pointerdown', pointerdown_handler);
            el.removeEventListener('pointermove', pointermove_handler);
            let evts = ['pointerup', 'pointercancel', 'pointerout', 'pointerleave'];
            for (const evtName of evts) {
                el.removeEventListener(evtName, pointerup_handler);
            }
        }
    };
}

export function getChannelLabels(channels) {
    return channels.map((ch, idx) => ch.label || idx + "");
}

export function formatPixelSizes(pixel_sizes) {
    return ["x", "y", "z"].map((dim) => pixel_sizes[dim])
    .filter(Boolean).map(num => num.toPrecision(3)).join(", ")
}