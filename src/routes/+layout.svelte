<script>
	import '../app.css';

	import { preparePageTransition } from '$lib/page-transitions';

	preparePageTransition();
</script>

<nav>
	<a href="/">Home</a>
	|
	<a href="/about">About</a>
</nav>

<slot></slot>

<style>
	nav {
		padding: 10px;
		border-bottom: solid grey 1px;
	}
</style>
