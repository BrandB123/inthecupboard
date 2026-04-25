import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');

        if (!email) {
            // add the right status code later
            return fail(400, { emailMissing: true });
        }

        if (!password) {
            // add the right status code later
            return fail(400, { passwordMissing: true, email })
        }

        // make sure we got the data we want




        // look up user in DB based on email
        // if no user, return fail to user

        // if user found
        //     hash password
        //     compare password hashes
    
        // if password is incorrect, return fail to user
        // else pass JWT cookie back to user

        // once authenticated, redirect to home page
        redirect(303, "/home");
    }
}