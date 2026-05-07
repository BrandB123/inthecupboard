import jwt from "jsonwebtoken";
import { fail, redirect } from "@sveltejs/kit";
import { checkPassword } from "$lib/auth.js";
import { connectToDatabase, getUser } from "$lib/db.js";
import 'dotenv/config';

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');

        if (!email) {
            // add the right status code later
            return fail(400, { emailMissing: true });
        }

        // TODO: Validate email input. Make sure that email is an email

        if (!password) {
            // add the right status code later
            return fail(400, { passwordMissing: true, email })
        }

        const db = connectToDatabase("local.db");
        const user = getUser(db, email.toLowerCase());
        console.log("USER: ", user);

        if(!user) {
            return fail(400, {invalidCredentials: true, email});
        }
        
        const match = await checkPassword(password, user?.password_hash);
        
        if (!match) {
            return fail(400, {invalidCredentials: true, email});
        }
    
        // else pass JWT cookie back to user
        delete user.password_hash;
        const token = jwt.sign(user, process.env.secretKey, { expiresIn: "12h"})
        cookies.set("session-token", token, { path: "/" });

        redirect(303, "/home");
    }
}