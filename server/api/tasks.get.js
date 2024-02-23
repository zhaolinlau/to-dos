import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const client = await serverSupabaseClient(event);
	const { data, error } = await client
		.from("tasks")
		.select("*")
		.eq("user_id", `${user?.id}`)
		.order("created_at", { ascending: false });

	if (error) {
		throw error;
	} else {
		return data;
	}
});