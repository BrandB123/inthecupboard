<script>
    let { data } = $props();
    let category = $state();
    
    const allDishes = data?.dishes;
    
</script>

<div>
    {#if data.message}
        <p>{data.message}</p>
    {/if}
    
    <div class="w-5/6 md:w-1/2 lg:w-1/3 border rounded-xl px-8 pt-4 pb-8 mx-auto mt-20 min-h-[50vh]">
        <h2 class="text-3xl text-center border-b mb-4 pb-2 ">Dishes</h2>
        <select bind:value={category} class="border rounded-lg block ml-auto text-center">
            <option value="all" selected>All</option>
            <option value="main">Main</option>
            <option value="side">Side</option>
            <option value="dessert">Dessert</option>
        </select>
        <ul class="list-disc">
            {#if allDishes.length > 0}
                {#each allDishes as dish}
                   {#if dish.category === category || category === "all"}
                       <li class="ml-8">
                            <a 
                                data-sveltekit-reload
                                href="/dishes/{dish?.name.toLowerCase()}"
                                class="capitalize">
                                {dish?.name}
                            </a>
                        </li>
                   {/if}
                {/each}
            {:else}
                <p>Please add a dish to view it here</p>
            {/if}
        </ul>
    </div>
</div>