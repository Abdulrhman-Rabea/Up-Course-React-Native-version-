
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://drivegkljrqryhoorrfy.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyaXZlZ2tsanJxcnlob29ycmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NDYxNjQsImV4cCI6MjA3MzQyMjE2NH0.mJg5U53yLWSkvUHAVCSYdSiLHKhU2gwTG-StM1z-Sq4'
// export const supabase = createClient(supabaseUrl, supabaseKey)



// supabaseClient.js

import 'react-native-url-polyfill/auto'   
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://drivegkljrqryhoorrfy.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyaXZlZ2tsanJxcnlob29ycmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NDYxNjQsImV4cCI6MjA3MzQyMjE2NH0.mJg5U53yLWSkvUHAVCSYdSiLHKhU2gwTG-StM1z-Sq4'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,      
    autoRefreshToken: true,     
    persistSession: true,        
    detectSessionInUrl: false,    
  },
})
