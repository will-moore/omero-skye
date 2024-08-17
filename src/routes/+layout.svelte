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
		border-bottom: solid black 1px;
		background-color: rgb(33, 37, 41);
		background: linear-gradient(to top, #46474a, rgb(33, 37, 41));
	}

	a {
		color: white;
		text-decoration: none;
	}
</style>
