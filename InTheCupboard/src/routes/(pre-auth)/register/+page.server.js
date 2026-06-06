import { fail, redirect } from '@sveltejs/kit';
import { hashPassword } from '$lib/auth.js';
import { connectToDatabase, createUser } from '$lib/db.js';
import { hash } from 'bcrypt';

export const actions = {
    default: async ({request}) => {
        
        const data = await request.formData();
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const email = data.get("email");
        const password = data.get("password");

        // check that we got the data we wanted
        if (!firstName) {
            console.log("returning due to bad name input")
            // make this the right status code later
            return fail(406, { nameMissing: true, firstName, lastName, email});
        }
        if (!email) {
            // make this the right status code later
            return fail(400, {emailMissing: true, firstName, lastName})
        }
        if (!password) {
            // make this the right status code later
            return fail(400, {passwordMissing: true, firstName, lastName, email})
        }

        // TODO: make sure email is an email

        // TODO: make sure password meets security requirements (length, not simple)
        
        try {            
            const password_hash = await hashPassword(password);
            const user = {
                name: {
                    first: firstName,
                    last: lastName,
                },
                email: email.toLowerCase(),
                password_hash
            }
    
            const db = connectToDatabase(process.env.db_path);
            createUser(db, user);
        } catch (error) {
            if (error.code && error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                console.error("Unique Constraint Violation");
                return fail(400, {userAlreadyExists: true, firstName, lastName, email});
            }
            if (error.code) {
                console.error("SQL ERROR: ", error.code);
                return fail(400, {otherError: true, firstName, lastName, email});
            }

            console.error("ERROR: ", error);
            return fail(400, {otherError: true, firstName, lastName, email})
        }

        redirect(303, "/login");
    }
}