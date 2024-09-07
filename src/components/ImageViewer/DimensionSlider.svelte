<script>
    import RangeSlider from 'svelte-range-slider-pips';

    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let max;
    export let value;

    function handleChange(event) {
        let [value] = event.detail.values;
        dispatch('change', value);
    };
</script>

<div class="zSlider">
    <div class="sliderWrapper"
        style="--range-slider:     #bbb;
            --range-handle-inactive:   #FFFFFF;
            --range-handle:            #FFFFFF;
            --range-handle-focus:      #FFFFFF;
            --range-handle-border:     #FFFFFF;
            --range-float-inactive:    #333;
            --range-float:             #333;
            --range-float-text:        hsl(0, 0%, 100%);"
        >
        <RangeSlider
            on:stop={handleChange}
            float
            min={0}
            {max}
            values={[value]}
        />
    </div>
    <div class="sliderLabel">Z</div>
</div>


<style>

    :global(.sliderWrapper .rangeSlider) {
        height: 2px;
    }
    :global(.sliderWrapper .rangeSlider .rangeHandle) {
        top: 1px;
    }
    .zSlider {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 1px 5px 1px 5px;
		background: transparent;
		width: 100%;
		position: relative;
	}
    .sliderWrapper {
        width: 100%;
        flex: auto 1 1;
    }
    .sliderLabel {
        color: white;
        flex: 40px 0 0;
        padding: 5px;
        font-size: 24px;
        font-weight: bold;
    }

</style>