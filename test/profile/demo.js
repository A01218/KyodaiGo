const { createClient } = supabase

const supabaseUrl = ''
const supabaseKey = "API key"
const client = createClient(supabaseUrl, supabaseKey)

const { data, error } = await client
  .from('Profile')
  .select()
  