import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = "https://vvuvxnchqqpmhxtchvhz.supabase.co"
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dXZ4bmNocXFwbWh4dGNodmh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTIyMTgsImV4cCI6MjA3NjgyODIxOH0.7L20XrbQPMLZVz_YDdKQtrX2-J0DDxj77lVxvrVV98o"


  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
          }
        },
      },
    }
  )
}