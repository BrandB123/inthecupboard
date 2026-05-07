import { connectToDatabase, getUser } from '$lib/db.js';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
    
export const load = ({ cookies }) => {
    const sessionToken = cookies.get("session-token");

    try {
        if (!sessionToken) {
            throw new Error("No Token Returned: Unable to Authenticate")
        }
        const token = jwt.verify(sessionToken, process.env.secretKey);
    } catch (authError) {
        console.log(authError);
        redirect(303, "/login");
    }

    console.log("[Authentication Successful]")
    return;

}