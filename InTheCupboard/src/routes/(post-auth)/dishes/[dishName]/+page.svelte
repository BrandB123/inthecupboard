<script>
    let { data } = $props();
    const dish = data?.dish;
    const ingredients = dish?.ingredients?.split(",");
</script>

<div class="border w-2/3 mx-auto mt-10 px-12 pt-8 pb-12">
    <h2 class="text-3xl capitalize text-center">{dish?.name}</h2>
    <h3 class="text-md italic text-center">({dish.category})</h3>
    <div class="pl-12">
        <h3 class="text-xl">Ingredients</h3>
        <ul class="list-disc pl-8">
            {#each ingredients as ingredient}
                <li>{ingredient}</li>
            {/each}
        </ul>
    </div>
</div>