import { connectToDatabase, getUser, getUserDishes } from '$lib/db.js';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
    
export const load = async ({ cookies }) => {
    const sessionToken = cookies.get("session-token");

    let token;

    try {
        token = jwt.verify(sessionToken, process.env.secretKey);
    } catch(e) {
        console.log(e);
    }

    const db = connectToDatabase("local.db");
    try {
        return { dishes: getUserDishes( db, token?.id ) };
    } catch (error) {
        console.log("[Error Obtaining Dishes]");
        console.log(error);
        return { message: "Sorry, we couldn't obtain your dishes at this time. Please try again later" };
    }
}
