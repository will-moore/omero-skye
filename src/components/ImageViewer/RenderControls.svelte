<script>
	import { fade } from 'svelte/transition';

	export let renderSettings;
	export let showRenderControls;

    let channels = renderSettings.getChannels();

    renderSettings.subscribe(() => {
        channels = renderSettings.getChannels();
    });

	let toggleCh = (ch) => {
		renderSettings.toggleChannel(ch);
	};

	function chButtonColor(ch) {
		// if the channel color is black, change it to white (maybe don't need this!?)
		let color = ch.color;
		if (color === '000000') {
			color = 'FFFFFF';
		}
		return toHSL(`#${color}`);
	}

	function toHSL(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		var r = parseInt(result[1], 16);
		var g = parseInt(result[2], 16);
		var b = parseInt(result[3], 16);

		(r /= 255), (g /= 255), (b /= 255);
		var max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		var h = 0;
		var s = 0;
		var l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}
		h = h * 360;
		s = s * 100;
		s = Math.round(s);
		l = l * 100;
		l = Math.round(l);
        return [h, s, l];
    }

    function bgColor(ch) {
        let [h, s, l] = toHSL(`#${ch.color}`);
        l = ch.active ? 70 : 95;
		var colorInHSL = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
		return colorInHSL;
	}
    function borderColor(ch) {
        let [h, s, l] = toHSL(`#${ch.color}`);
		var colorInHSL = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
		return colorInHSL;
    }
</script>

{#if showRenderControls}
	<div transition:fade={{ delay: 0, duration: 300 }} class="renderControls">
		{#each channels as ch, i}
			<button class="chButton"
                style:color={ch.active ? 'black' : "rgba(0,0,0,0.6)"}
                style:background-color={bgColor(ch)}
                style:--color={borderColor(ch)} on:click={() => toggleCh(i)}
				>{ch.label || i}</button
			>
		{/each}
	</div>
{/if}

<style>

	.renderControls {
		position: fixed;
		top: 10px;
		padding-left: 10px;
		background-color: transparent;
		display: flex;
		align-items: center;
		gap: 10px;
        width: 100%;
        overflow-x: auto;
	}

    .chButton {
		border: solid 2px var(--color);
		border-radius: 50px;
		padding: 5px 10px;
		cursor: pointer;
        white-space: nowrap;
        max-width: 200px;
        text-overflow: ellipsis;
	}
</style>
