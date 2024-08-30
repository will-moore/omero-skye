
<script>

    import Ann from '../../../../../../../annotations/ann.svelte';

	import Fa from 'svelte-fa';
	import { objUrl } from '$lib/util';
	import { faAngleLeft} from '@fortawesome/free-solid-svg-icons';

	export let data;
</script>

<div class="header">
		<div class="parents">
			<a href="/{data.otype}/{data.id}/image/{data.iid}">
				<Fa icon={faAngleLeft} color="#999" /> Image
			</a>
		</div>
	<div class="row">
		<div class="name">
			<h1>Annotations</h1>
		</div>
	</div>
</div>


{#each Object.keys(data.annotations) as annType}
	<h3 class="annType">{annType}</h3>
	<ul>
		{#each data.annotations[annType] as ann}
			<li>
				<Ann {ann} />
			</li>
		{/each}
	</ul>
{/each}

<style>
	.row {
		padding: 0;
		margin-top: 8px;
		display: flex;
		flex-direction: row;
		width: 100%;
		max-width: 100%;
		gap: 10px;
	}
	.header {
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 1000;
		border-bottom: solid #ddd 1px;
		padding: 10px;
		padding-bottom: 5px;
	}
	.name {
		flex: auto 1 1;
	}

	.annType {
		margin: 5px 0;
		padding: 0 10px;
		border-bottom: solid #ddd 1px;
		position: sticky;
		top: 80px;
		z-index: 9999;
		background-color: white;
	}
	h3 {
		margin-top: 5px;
	}

	h1 {
		line-height: normal;
		line-break: anywhere;
	}

	ul {
		padding: 10px;
	}
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
		color: grey;
	}
	.parents {
		margin: 0;
	}
	.parents a {
		display: block;
		width: fit-content;
		max-width: 100%;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		overflow: hidden;
		background-color: white;
		border: solid rgb(179, 178, 178) 1px;
		border-radius: 3px;
		padding: 0 3px;
	}
</style>
