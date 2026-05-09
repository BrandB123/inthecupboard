<script>
    let {data, form} = $props();

    let ingredients = $state([]);
    let newIngredient = $state("");

    function toggleShowAddItemInput() {
        showAddItemInput = !showAddItemInput;
    }

    function updateIngredientsArray() {
        if (!newIngredient) {
            console.log("new ingredient doesn't exist");
            return
        }

        ingredients.push(newIngredient);
        // toggleShowAddItemInput();
        newIngredient = "";
    }
</script>

<form method="POST" class="border rounded-xl flex flex-col gap-5 w-1/3 px-10 pt-10 pb-4 mx-auto mt-20">
    <!-- TODO: add some input validation here -->
    <div class="w-full flex flex-col justify-items-center">
        <label for="name" class="block font-bold">Title</label>
        <input name="name" type="text" class="border-b pl-2 ml-2 w-full" value={form?.name ?? ""}>
    </div>

    <!-- TODO: add some input validation here -->
    <div class="w-full flex flex-col justify-items-center">
        <label for="category" class="block font-bold">Category</label>
        <select name="category" class="border rounded-lg pl-2 ml-2 w-full">
            <option value="main">Main Dish</option>
            <option value="side">Side</option>
            <option value="dessert">Dessert</option>
        </select>
    </div>

    <!-- TODO: add some input validation here -->
    <div class="w-full flex flex-col">
        <label for="ingredients" class="block font-bold">Ingredients</label>
        <ul class="ml-2">
            {#each ingredients as ingredient}
                <li>{ingredient}</li>
            {/each}
        </ul>
        
        <div class="flex gap-2 justify-end ml-2 ">
            <input name="ingredients" type="text" class="border-b pl-2 grow" bind:value={newIngredient}>
            <button 
                type="button"
                class="border rounded-lg px-2 "
                onclick={updateIngredientsArray}>
                add
            </button>
        </div>
    </div>

    <div class="flex justify-center content-center">
        <button class="border rounded-md px-2 my-2">Submit</button>
    </div>
    {#if form?.titleMissing}<p class="text-red-600 mx-auto">Title is a required field</p>{/if}
    {#if form?.categoryMissing}<p class="text-red-600 mx-auto">Category is a required field</p>{/if}
</form>