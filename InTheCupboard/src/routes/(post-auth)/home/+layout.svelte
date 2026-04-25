<script>
	let { children } = $props();
</script>

<nav class="flex mx-6 my-6">
	<h1 class="font-serif text-3xl">In The Cupboard</h1>
	<div class="ml-auto mr-6 flex gap-6 items-end">
		<a href="/register">Add Dish</a>
		<a href="/login">Grocery List</a>
		<a href="/register">Search</a>
	</div>
</nav>
{@render children()}