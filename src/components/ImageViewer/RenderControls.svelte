
<script>

    export let renderSettings;

    let toggleCh = (ch) => {
        renderSettings.toggleChannel(ch);
    }
</script>

<div class="renderControls">

    <button on:click={() => toggleCh(0)}>Toggle Ch 0</button>
    <button on:click={() => toggleCh(1)}>Toggle Ch 1</button>
    <button on:click={() => toggleCh(2)}>Toggle Ch 2</button>
</div>

<style>
    .renderControls {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    
</style>