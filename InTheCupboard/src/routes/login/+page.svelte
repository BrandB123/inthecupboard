<script>
    let {data, form} = $props();
</script>

<form method="POST" class="border rounded-xl flex flex-col gap-5 w-1/4 px-10 pt-10 pb-4 mx-auto mt-20">
    <div class="w-full flex flex-col justify-items-center">
        <label for="email" class="block">Email</label>
        <input name="email" type="text" class="border rounded-lg pl-2 w-full" value={form?.email ?? ""}>
    </div>

    <div class="w-full flex flex-col">
        <label for="password" class="block">Password</label>
        <input name="password" type="password" class="border rounded-lg pl-2 w-full">
    </div>

    <div class="flex justify-center content-center">
        <button class="border rounded-md px-2 my-2">Login</button>
    </div>
    {#if form?.emailMissing}<p class="text-red-600 mx-auto">Email is a required field</p>{/if}
    {#if form?.passwordMissing}<p class="text-red-600 mx-auto">Password is a required field</p>{/if}
</form>