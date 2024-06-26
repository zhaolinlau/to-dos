import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event)
	const { id } = await readBody(event)
	const { error } = await client.from("tasks").delete().eq("id", id)

	if (error) {
		throw createError({
			statusCode: error.code,
			statusMessage: error.message
		})
	}
})
