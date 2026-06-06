import jwt from "jsonwebtoken";
import { connectToDatabase, getUserDish } from "$lib/db.js";

export const load = ({ url, cookies }) => {
    const sessionToken = cookies.get("session-token");

    let token;

    try {
        token = jwt.verify(sessionToken, process.env.secretKey);
    } catch (e) {
        console.log(e);
    }
    
    const db = connectToDatabase(process.env.db_path);
    const dishName = url?.pathname?.split("/")[2].replace("%20", " ");

    try {
        const dish = getUserDish(db, token.id, dishName);
        return { dish };
    } catch (error) {
        console.log("[Error Obtaining Dish]");
        console.log(error);
        return {message: "Sorry, we couldn't find this dish currently. Please try again later"};
    }
}