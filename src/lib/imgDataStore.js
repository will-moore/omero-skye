
import { writable, get } from 'svelte/store';

export class RenderingSettings {
    constructor(imgData) {
        this.store = writable(imgData);
    }

    toggleChannel(idx) {
        this.store.update((imgData) => {
            imgData.channels[idx].active = !imgData.channels[idx].active;
            return imgData;
        });
    }

    getQueryString() {
        const imgData = get(this.store);
        return `c=${imgData.channels.map(chMarshal).join(',')}&m=c&p=normal&ia=${imgData.rdefs.invertAxis ? 1 : 0}&maps=${chMaps(imgData)}`;
    
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

