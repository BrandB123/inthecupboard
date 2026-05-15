<script>
    let { data } = $props();
</script>

<div>
    {#if data.message}
        <p>{data.message}</p>
    {/if}
    
    <div class="w-1/3 border rounded-xl px-8 pt-4 pb-8 mx-auto mt-20 min-h-[50vh]">
        <h2 class="text-3xl text-center border-b mb-4 pb-2 ">Dishes</h2>
        <ul class="list-disc">
            {#if data.dishes?.length > 0}
                {#each data.dishes as dish}
                    <li class="ml-8">
                        <a 
                            href="/dishes/{dish?.name.toLowerCase()}"
                            class="capitalize">
                            {dish?.name}
                        </a>
                    </li>
                {/each}
            {:else}
                <p>Please add a dish to view it here</p>
            {/if}
        </ul>
    </div>

    
</div>