import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
    cookies.delete("session-token", { path: "/" });
    redirect(303, "/login");
}