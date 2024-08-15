<script>
	export let dataType;
	export let objId;
	export let name;
	export let childCount;

    const objColors = {
        "project": "rgb(131, 143, 163)",
        "screen": "rgb(80, 78, 79)",
        "dataset": "rgb(156, 178, 132)",
    }
</script>


<a href="/{dataType}/{objId}">
	<div class="row">
		<svg
			width="40"
			height="40"
			stroke-width="0"
			class=""
			viewBox="0 0 512 512"
			stroke={objColors[dataType]}
			fill={objColors[dataType]}
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"
			></path></svg
		>
		<div class="name">{name}</div>
		<div class="childCount">
			{#if childCount}
				{childCount}
			{/if}
		</div>
	</div>
</a>

<style>
	.row {
		display: flex;
		flex-direction: row;
        gap: 10px;
	}
    svg {
        flex: 50px 0 0;
    }
    .name {
        flex: auto 1 1;
        padding: 5px;
        word-break: break-word;
    }
    .childCount {
        flex: 50px 0 0;
        padding: 5px;
    }


	a {
		text-decoration: none;
		color: #666;
	}
</style>
