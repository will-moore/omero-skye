<script>
	import { PUBLIC_BASE_URL as BASE_URL } from '$env/static/public';

	export let dataType;
	export let objId;
	export let name;
	export let childCount;
	export let parentType;
	export let parentId;

	const objColors = {
		project: 'rgb(131, 143, 163)',
		screen: 'rgb(80, 78, 79)',
		dataset: 'rgb(156, 178, 132)'
	};
</script>

{#if dataType == 'image'}
	<a href="/{parentType}/{parentId}/{dataType}/{objId}">
		<div class="row">
			<div class="icon">
				<img
					style:--viewtransitionkey="image-{objId}"
					class="thumbnail"
					alt="Thumbnail of {name}"
					loading="lazy"
					src="{BASE_URL}/webclient/render_thumbnail/{objId}/"
				/>
			</div>
			<div class="name">{name}</div>
		</div>
	</a>
{:else}
	<a href="/{dataType}/{objId}">
		<div class="row">
			<div class="icon">
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
			</div>
			<div class="name">{name}</div>
			<div class="childCount">
				{#if childCount}
					{childCount}
				{/if}
			</div>
		</div>
	</a>
{/if}

<style>
	.row {
		display: flex;
		flex-direction: row;
		gap: 10px;
        align-items: center;
        margin-bottom: 10px;
	}
	.icon {
		flex: auto 0 0;
	}
	.thumbnail {
		width: 48px;
		height: 48px;
	}
	img {
		view-transition-name: var(--viewtransitionkey);
	}
	.name {
		flex: auto 1 1;
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
