<script>
    let { data } = $props();
</script>

<div>
    {#if data.message}
        <p>{data.message}</p>
    {/if}
    
    {#if data.dishes?.length > 0}       
        {#each data.dishes as dish}
            <p>{dish.name}</p>
        {/each}
    {:else}
        <p>Please add a dish to view it here</p>
    {/if}

    
</div>