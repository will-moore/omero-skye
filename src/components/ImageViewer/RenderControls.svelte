
<script>

    import { fade } from 'svelte/transition';

    export let renderSettings;
    export let showRenderControls;

    let toggleCh = (ch) => {
        renderSettings.toggleChannel(ch);
    }
</script>

{#if showRenderControls}
    <div transition:fade={{ delay: 0, duration: 300 }} class="renderControls">
        <button on:click={() => toggleCh(0)}>Toggle Ch 0</button>
        <button on:click={() => toggleCh(1)}>Toggle Ch 1</button>
        <button on:click={() => toggleCh(2)}>Toggle Ch 2</button>
    </div>
{/if}


<style>
    .renderControls {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    
</style>