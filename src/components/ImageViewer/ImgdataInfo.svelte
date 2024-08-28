<script>
	import { formatDate, getChannelLabels, formatPixelSizes } from '$lib/util';
	export let imgData;
</script>

<h2>{imgData.meta.imageName}</h2>
<h3>Image: {imgData.id}</h3>
<p class="marginBorder">
	Imported: <strong> {formatDate(imgData.meta.imageTimestamp * 1000)}</strong><br />
	Owner: <strong>{imgData.meta.imageAuthor}</strong>
</p>

<table>
	<tbody>
		<tr><td>Size X/Y:</td><td>{imgData.size.width} x {imgData.size.height}</td></tr>
		<tr><td>Size Z/Time:</td><td>{imgData.size.z} x {imgData.size.t}</td></tr>
		<tr><td>Pixels Type</td><td>{imgData.meta.pixelsType}</td></tr>
		<tr><td>Channels</td><td>{getChannelLabels(imgData.channels).join(', ')}</td></tr>
		<tr><td>Pixel Sizes</td><td>{formatPixelSizes(imgData.pixel_size)}</td></tr>
	</tbody>
</table>

<style>
	table {
		animation: fade-in linear forwards;
		animation-timeline: scroll();
	}

	.marginBorder {
		margin: 15px 0;
		padding: 10px 0;
		border-top: solid lightgrey 1px;
		border-bottom: solid lightgrey 1px;
	}
</style>
