<script>
	let { children } = $props();
</script>

<nav class="flex mx-6 my-6">
	<h1 class="font-serif flex-1 text-3xl">In The Cupboard</h1>
	<div class="ml-auto flex-1 flex gap-6 justify-end items-end pt-3 pr-3 text-md lg:text-lg">
		<a href="/register">Create Account</a>
	</div>
</nav>
{@render children()}