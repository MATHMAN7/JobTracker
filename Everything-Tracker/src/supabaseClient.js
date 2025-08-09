import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hhspphwomcthkyabmuzo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhoc3BwaHdvbWN0aGt5YWJtdXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NDUxMTksImV4cCI6MjA3MDMyMTExOX0.Kkl_cYYfdISwyrxCkKRpMS8BKfbPXIA2_WpkW-4V0d0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
