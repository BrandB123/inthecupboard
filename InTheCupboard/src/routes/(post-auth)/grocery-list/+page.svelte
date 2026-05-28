
<!-- DONE: checklist of dishes, when checked, adds them to a list -->
<!-- DONE: alphabetical list of dishes -->
<!-- Add a search for finding dishes -->
<!-- Build list dynamically or on submit? -->
<!-- Just show list on page or add ability to send it somewhere? -->
<script>
    let { data } = $props();

    const alphabeticalNameSort = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    };

    const alphabeticalSort = (a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    };

    let allDishes = $state(data.dishes.sort(alphabeticalNameSort));
    let selectedDishes = $state([]);
    let groceries = $derived.by(() => {
        let groceries = new Set();
        
        selectedDishes.forEach((selectedDish) => {
            const dish = allDishes.find( dish => dish.name === selectedDish);
            dish.ingredients.split(",").forEach( ingredient => groceries.add(ingredient))
        })

        groceries  = Array.from(groceries)
        return groceries.sort(alphabeticalSort)
    })

    let dishesListVisible = $state(true)
    let groceryListVisible = $derived(!dishesListVisible)

    function toggleListVisibility() {
        dishesListVisible = !dishesListVisible
    }

</script>


<div>
    {#if data.message}
        <p>{data.message}</p>
    {/if}
    
    <div class="w-1/3 border rounded-xl px-8 pt-4 pb-8 mx-auto mt-20 { dishesListVisible ? "visible" : "hidden" }">
        <h2 class="text-3xl text-center border-b mb-4 pb-2 ">Grocery List</h2>
        <!-- make this a search bar -->
        <select class="border rounded-lg block ml-auto text-center">
            <option value="all" selected>All</option>
            <option value="main">Main</option>
            <option value="side">Side</option>
            <option value="dessert">Dessert</option>
        </select>

        {#if allDishes.length > 0}
                {#each allDishes as dish}
                    <label class="block capitalize">
                        <input 
                            type="checkbox" 
                            bind:group={selectedDishes} 
                            value={dish.name} 
                            class="mr-2">
                        {dish.name}
                    </label>
                {/each}    
                <div class="w-full mt-10 flex justify-center ">
                    <button class="border rounded-lg px-2 py-1" onclick={toggleListVisibility}>Submit</button>
                </div>
        {:else}
            <p>Please add a dish to view it here</p>
        {/if}
    </div>

    <div class="w-1/3 border rounded-xl px-8 pt-4 pb-8 mx-auto mt-20 relative { groceryListVisible ? "visible" : "hidden" }">
        <h2 class="text-3xl text-center border-b mb-4 pb-2 ">Grocery List</h2>
        {#if groceries.length > 0}
                {#each groceries as item}
                    <ul class="list-disc ml-10">
                        <li>
                            {item}
                        </li>
                    </ul>
                {/each}
                <div class="w-full mt-10 flex justify-center ">
                    <button class="border rounded-lg px-2 py-1" onclick={toggleListVisibility}>Done</button>
                </div>    
        {:else}
            <p>No dishes selected. Please select a dish to view ingredients needed</p>
        {/if}
    </div>

</div>