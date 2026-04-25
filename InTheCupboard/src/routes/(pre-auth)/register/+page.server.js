import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({request}) => {
        const data = await request.formData();

        const user = {
            name: {
                first: data.get("firstName"),
                last: data.get("lastName")
            },
            email: data.get("email"),
            password: data.get("password")
        };

        // check that we got the data we wanted
        if (!user.name.first) {
            console.log("returning due to bad name input")
            // make this the right status code later
            return fail(406, { nameMissing: true, name: user.name, email: user.email})
        }
        if (!user.email) {
            // make this the right status code later
            return fail(400, {emailMissing: true, name: user.name})
        }
        if (!user.password) {
            // make this the right status code later
            return fail(400, {passwordMissing: true, name: user.name, email: user.email })
        }
        // throw an error if data is missing
            // make the error clear
            // maybe make a function somewhere else and import so we can also write tests against it

        // add user account to the db
            // hash password

        // redirect to the login page
        redirect(303, "/login");
    }
}