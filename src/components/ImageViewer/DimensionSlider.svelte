<script>
    import Fa from 'svelte-fa';
    import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
    import RangeSlider from 'svelte-range-slider-pips';

    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let max;
    export let value;

    $: values = [value];

    function handleChange(event) {
        value = event.detail.values[0];
        dispatch('change', value);
    };
    function handleIncrement(incr) {
        console.log('handleIncrement', incr)
        if (value + incr < 0) {
            return;
        }
        if (value + incr > max) {
            return;
        }
        value = value + incr
        // values = [value + incr];
        dispatch('change', value);
    }
</script>

<div class="zSlider">

    <button class="increment" on:click={() => handleIncrement(-1)}>
        <Fa icon={faAngleLeft} color="#ddd" size="lg" />
    </button>
    <div class="sliderWrapper"
        style="--range-slider:     #ddd;
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
            prefix="Z: "
            min={0}
            {max}
            {values}
        />
    </div>
    <button class="increment" on:click={() => handleIncrement(1)}>
        <Fa icon={faAngleRight} color="#ddd" size="lg" />
    </button>
</div>


<style>

:global(.sliderWrapper .rangeSlider.rangeSlider .rangeFloat),
:global(.sliderWrapper .rangeSlider.rangeSlider.focus .rangeFloat),
:global(.sliderWrapper .rangeSlider.rangeSlider:hover .rangeFloat) {
  opacity: 1;
  top: -.25em;
  translate: 0% 100%;
  border-radius: 1em;
  padding: .25em .75em;
  pointer-events: all;
}

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
    .increment {
        color: white;
        flex: 40px 0 0;
        padding: 5px;
        font-weight: bold;
        background-color: transparent;
        border: none;
    }

</style>