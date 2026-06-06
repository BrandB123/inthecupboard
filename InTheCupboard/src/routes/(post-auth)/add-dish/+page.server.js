import { addUserDish, connectToDatabase } from '$lib/db.js';
import { fail } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const CATEGORIES = ['main', 'side', 'dessert'];

export const actions = {
    default: async ({ cookies, request }) => {
        // get user data from cookies
        const sessionToken = cookies.get("session-token");

        let token;

        try {
            token = jwt.verify(sessionToken, process.env.secretKey);
        } catch(e) {
            console.log(e);
        }

        // get form data from request
        const data = await request.formData();
        const name = data?.get("name");
        const ingredients = data?.get("ingredients");
        const category = data?.get("category");

        // check that we got all the right data
        if (!name) return fail(400, {nameMissing: true});
        if (!category) return fail(400, {categoryMissing: true});
        if (!CATEGORIES.includes(category)) return fail(400, { categoryMissing: true });

        // add dish to database
        const db = connectToDatabase(process.env.db_path);

        try {
            addUserDish(db, name, ingredients, category, token.id);
        } catch (error) {
            console.log("[Error Adding Entry to Database");
            console.log(error);
            return fail(500, { insertError: true })
        }

        // return success and flash message
        return { success: true };

    }
}