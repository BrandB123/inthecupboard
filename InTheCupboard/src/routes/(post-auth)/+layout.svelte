<script>
    let { children } = $props();
</script>

<nav class="flex mx-6 my-6">
	<h1 class="font-serif text-3xl">In The Cupboard</h1>
	<div class="ml-auto mr-6 flex gap-6 items-end">
		<a href="/add-dish">Add Dish</a>
		<a href="/grocery-list">Grocery List</a>
		<a href="/search">Search</a>
        <a href="/logout" data-sveltekit-preload-data="tap">Log out</a>
	</div>
</nav>
{@render children()}