<script>
	import RangeSlider from 'svelte-range-slider-pips';
	import { fade } from 'svelte/transition';
	import { toHSL } from '$lib/util';

	export let renderSettings;
	export let showRenderControls;
	export let cssFixed = false;

	let channels = renderSettings.getChannels();
	let selectedChannelIndex = -1;

	$: selectedChannel = selectedChannelIndex >= 0 ? channels[selectedChannelIndex] : undefined;

	renderSettings.subscribe(() => {
		channels = renderSettings.getChannels();
	});

	let toggleCh = (ch) => {
		renderSettings.toggleChannel(ch);
	};

	let selectChannel = (i) => {
		if (selectedChannelIndex === i) {
			selectedChannelIndex = -1;
			return;
		}
		selectedChannelIndex = i;
	};

    let handleSliderStop = (event) => {
        let [start, end] = event.detail.values;
        renderSettings.setChannelWindow(selectedChannelIndex, start, end);
    }

	function handleStartChange(event) {
		let value = event.target.value;
		console.log('handleStartChange', value);
		renderSettings.setChannelStart(selectedChannelIndex, value);
	}

	function handleEndChange(event) {
		let value = event.target.value;
		console.log('handleEndChange', value);
		renderSettings.setChannelEnd(selectedChannelIndex, value);
	}

	function bgColor(ch) {
		let [h, s, l] = toHSL(`#${ch.color}`);
		l = 70;
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
	<div
		transition:fade={{ delay: 0, duration: 300 }}
		style:position={cssFixed ? 'fixed' : 'absolute'}
		class="renderControls"
	>
		{#if selectedChannel}
			{@const colorLt = bgColor(selectedChannel)}
			{@const color = borderColor(selectedChannel)}
			<div style="width: 100%; padding: 0 10px;">
				<div
					class="selectedChannel"
					style:background-color="transparent"
					style:border-color="transparent"
					style="--range-slider:     #666;
                    --range-handle-inactive:   {colorLt};
                    --range-handle:            {colorLt};
                    --range-handle-focus:      {colorLt};
                    --range-handle-border:     {color};
                    --range-range-inactive:    {color};
                    --range-range:             {color};
                    --range-float-inactive:    #333;
                    --range-float:             #333;
                    --range-float-text:        hsl(0, 0%, 100%);"
				>
					<RangeSlider
                        on:stop={handleSliderStop}
						range
						float
						min={selectedChannel.window.min}
						max={selectedChannel.window.max}
						values={[selectedChannel.window.start, selectedChannel.window.end]}
					/>
				</div>
			</div>
		{/if}
		<div class="chButtons scrollbar-hidden">
			{#each channels as ch, i}
				<button
					class="chButton"
					style:color={ch.active ? 'black' : 'rgba(0,0,0,0.6)'}
					style:background-color={bgColor(ch)}
					style:--color={borderColor(ch)}
					on:click={() => selectChannel(i)}>{ch.label || i}</button
				>
			{/each}
		</div>
	</div>
{/if}

<style>
	@keyframes fadeout {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	.renderControls {
		bottom: 10px;
		left: 0;
		background-color: transparent;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 100%;
		overflow-x: auto;
		z-index: 1;

		/* fade the controls as the info pane scrolls up */
		animation: fadeout linear forwards;
		animation-timeline: scroll();
	}

	.selectedChannel {
		border-radius: 20px;
		border: solid 2px transparent;
		width: 100%;
		padding: 20px 5px 3px 5px;
	}

	.chButtons {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
		padding-left: 10px;
        width: 100%;
        overflow: auto;
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

    /* Hide scrollbar for Chrome, Safari and Opera */
	.scrollbar-hidden::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge add Firefox */
	.scrollbar-hidden {
		-ms-overflow-style: none;
		scrollbar-width: none; /* Firefox */
	}
</style>
