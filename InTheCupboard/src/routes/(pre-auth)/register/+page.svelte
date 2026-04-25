<script>
    let {data, form} = $props();
</script>

<form method="POST" class="border rounded-xl grid grid-cols-2 grid-rows-3 gap-5 w-2/5 px-10 pt-10 pb-4 mx-auto mt-20">
    <div class="">
        <label for="firstName" class="block capitalize">First Name</label>
        <input name="firstName" type="text" class="border rounded-lg pl-2" value={form?.name?.first ?? ""}>
    </div>

    <div class="">
        <label for="lastName" class="block">Last Name</label>
        <input name="lastName" type="text" class="border rounded-lg pl-2" value={form?.name?.last ?? ""}>
    </div>

    <div class="">
        <label for="email" class="block">Email</label>
        <input name="email" type="text" class="border rounded-lg pl-2" value={form?.email ?? ""}>
    </div>

    <div class="">
        <label for="password" class="block">Password</label>
        <input name="password" type="password" class="border rounded-lg pl-2">
    </div>

    <div class="col-span-full flex justify-center content-center">
        <button class="border rounded-md px-2 my-2">Create Account</button>
    </div>
    {#if form?.nameMissing}<p class="text-red-600 col-span-full mx-auto">Name is a required field</p>{/if}
    {#if form?.emailMissing}<p class="text-red-600 col-span-full mx-auto">Email is a required field</p>{/if}
    {#if form?.passwordMissing}<p class="text-red-600 col-span-full mx-auto">Password is a required field</p>{/if}
</form>
