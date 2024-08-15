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
		background: #141E30;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to top, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to top, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}

	a {
		color: white;
		text-decoration: none;
	}
</style>
