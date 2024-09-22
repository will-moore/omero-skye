
import { writable, get } from 'svelte/store';

export class RenderingSettings {
    constructor(imgData) {
        // add theZ and theT based on default Z/T
        imgData.theZ = imgData.rdefs.defaultZ;
        imgData.theT = imgData.rdefs.defaultT;
        // if greyscale, set active channel to white
        if (imgData.rdefs.model === "greyscale") {
            imgData.channels.forEach((ch) => {
                if (ch.active) {
                    ch.color = 'FFFFFF';
                }
            });
        }
        this.store = writable(imgData);
    }

    getSizeZ() {
        return get(this.store).size.z;
    }

    getZ() {
        return get(this.store).theZ;
    }

    setZ(theZ) {
        this.store.update((imgData) => {
            imgData.theZ = theZ;
            return imgData;
        });
    }

    getSizeT() {
        return get(this.store).size.t;
    }

    getT() {
        return get(this.store).theT;
    }

    setT(theT) {
        this.store.update((imgData) => {
            imgData.theT = theT;
            return imgData;
        });
    }

    toggleChannel(idx) {
        this.store.update((imgData) => {
            imgData.channels[idx].active = !imgData.channels[idx].active;
            return imgData;
        });
    }

    setChannelColor(idx, value) {
        this.store.update((imgData) => {
            imgData.channels[idx].color = value;
            return imgData;
        });
    }

    setChannelStart(idx, value) {
        this.store.update((imgData) => {
            imgData.channels[idx].window.start = value;
            return imgData;
        });
    }

    setChannelEnd(idx, value) {
        this.store.update((imgData) => {
            imgData.channels[idx].window.end = value;
            return imgData;
        });
    }

    setChannelWindow(idx, start, end) {
        this.store.update((imgData) => {
            imgData.channels[idx].window.start = start;
            imgData.channels[idx].window.end = end;
            return imgData;
        });
    }

    getChannels() {
        return get(this.store).channels;
    }

    getQueryString() {
        const imgData = get(this.store);
        // using /figure/render_scaled_region/ endpoint and we want full size image
        let region = `region=0,0,${imgData.size.width},${imgData.size.height}`;
        return `c=${imgData.channels.map(chMarshal).join(',')}&m=c&p=normal&ia=${imgData.rdefs.invertAxis ? 1 : 0}&maps=${chMaps(imgData)}&${region}`;
    
    }

    subscribe(run) {
        return this.store.subscribe(run);
    }
}


// functions for rendering imgData channels into query string
function chMarshal(ch, idx) {
    return `${ch.active ? '' : '-'}${idx + 1}|${ch.window.start}:${ch.window.end}$${ch.color}`;
}
function chMaps(imgData) {
    const maps_json = imgData.channels.map((ch) => {
        return { inverted: { enabled: ch.inverted } };
    });
    return JSON.stringify(maps_json).replace(/ /g, '');
}

