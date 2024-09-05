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

	let handleColorChange = (ch) => (event) => {
		renderSettings.setChannelColor(ch, event.target.value.slice(1));
	};

	let selectChannel = (i) => {
		// de-select channel if already selected
		if (selectedChannelIndex === i) {
			selectedChannelIndex = -1;
			return;
		}
		// turn channel ON if it is OFF
		if (!channels[i].active) {
			renderSettings.toggleChannel(i);
		}
		selectedChannelIndex = i;
	};

	let handleSliderStop = (event) => {
		let [start, end] = event.detail.values;
		renderSettings.setChannelWindow(selectedChannelIndex, start, end);
	};

	function bgColor(ch) {
		let [h, s, l] = toHSL(`#${ch.color}`);
		l = ch.active ? 65 : 80;
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
	{#if selectedChannel}
		{@const colorLt = bgColor(selectedChannel)}
		{@const color = borderColor(selectedChannel)}
		<button
			transition:fade={{ delay: 0, duration: 300 }}
			class="toggleButton"
			style:position={cssFixed ? 'fixed' : 'absolute'}
			style:border-color={color}
			style:background-color={colorLt}
			on:click={() => toggleCh(selectedChannelIndex)}
		>
			{selectedChannel.active ? 'ON' : 'OFF'}
		</button>

		<input
			class="colorPicker"
			on:change={handleColorChange(selectedChannelIndex)}
			value={`#${selectedChannel.color}`}
			style:position={cssFixed ? 'fixed' : 'absolute'}
			type="color"
		/>
	{/if}

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
		position: relative;
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

	.toggleButton {
		border: solid 2px;
		border-radius: 50px;
		padding: 10px 15px;
		cursor: pointer;
		right: 20px;
		bottom: 115px;
		font-weight: bold;
		/* fade the controls as the info pane scrolls up */
		animation: fadeout linear forwards;
		animation-timeline: scroll();
	}

	.colorPicker {
		border: solid 2px;
		border-radius: 50px;
		padding: 0;
		cursor: pointer;
		left: 20px;
		bottom: 115px;
		height: 50px;
		width: 50px;
		/* fade the controls as the info pane scrolls up */
		animation: fadeout linear forwards;
		animation-timeline: scroll();
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
