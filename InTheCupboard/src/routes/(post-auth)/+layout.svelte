<script>
    import { page } from "$app/state";
    let { children } = $props();
    
    const NAVIGATION_ITEMS = [
        {route: "/home", label: "Home"},
        {route: "/add-dish", label: "Add Dish"},
        {route: "/grocery-list", label: "Grocery List"},
        {route: "/search", label: "Search"},
        {route: "/logout", label: "Log Out"}
    ];

    let navigationTabs = [];
    let currentPage = $state(page.url.pathname);
    let homeTabVisible = $derived(currentPage === "/home" ? "hidden" : "visible");
    let dishTabVisibility = $derived(currentPage === "/add-dish" ? "hidden" : "visible");
    let groceryTabVisibility = $derived(currentPage === "/grocery-list" ? "hidden" : "visible");
    let searchTabVisibility = $derived(currentPage === "/search" ? "hidden" : "visible");
    let logoutTabVisibility = $derived(currentPage === "/logout" ? "hidden" : "visible");

</script>

<nav class="flex mx-6 my-6">
	<h1 class="font-serif text-3xl">In The Cupboard</h1>
	<div class="ml-auto mr-6 flex gap-6 items-end">
		<a 
            data-sveltekit-reload
            class="{homeTabVisible}"
            href="/home">
            Home
        </a>
		<a 
            data-sveltekit-reload
            class="{dishTabVisibility}"
            href="/add-dish">
            Add Dish
        </a>
		<a 
            data-sveltekit-reload
            class="{groceryTabVisibility}"
            href="/grocery-list">
            Grocery List
        </a>
		<a 
            data-sveltekit-reload
            class="{searchTabVisibility}"
            href="/search">
            Search
        </a>
        <a 
            data-sveltekit-reload
            data-sveltekit-preload-data="tap"
            class="{logoutTabVisibility}"
            href="/logout">
            Log out
        </a>
	</div>
</nav>
{@render children()}