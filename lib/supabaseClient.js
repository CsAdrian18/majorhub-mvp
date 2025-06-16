import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hhnidrvbyaycamuzdgls.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhobmlkcnZieWF5Y2FtdXpkZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Njk4OTcsImV4cCI6MjA2NTU0NTg5N30.PlqAgxhffEiUOhHCWsxmCMhHg-OjGqwVeQaL275OOZM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
