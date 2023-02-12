// All functions that connect to supabase will go here.

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    'https://quwoxojqzlogjvnclexm.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1d294b2pxemxvZ2p2bmNsZXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYxNTk3NDQsImV4cCI6MTk5MTczNTc0NH0.HoWjtoTQ_d2q9ExpKEObL531Q7vWINaqsQBxwDgVhxo',
    );

// Fetches all users.
export const fetchAllUsers = async () => {
    const { data, error } = await supabase
        .from('User')
        .select();

    return {data, error};
}

// Fetches a user by student id.
export const fetchUser = async (student_id) => {
    const { data, error } = await supabase
        .from('User')
        .select()
        .eq('student_id', student_id);

    return {data, error};
}

// Creates a new user.
export const createUser = async (student_id, password, place_category) => {  
    const { error } = await supabase
        .from('User')
        .insert({ student_id, password, place_category });

    if (error) {
        return error;
    }
}

// Updates specified user.
export const updateUser = async (student_id, place_category) => {  
    const { error } = await supabase
        .from('User')
        .update({ place_category })
        .eq('student_id', student_id);

    if (error) {
        return error;
    }
}

// Deletes specified user.
export const deleteUser = async (student_id) => {  
    const { error } = await supabase
        .from('User')
        .delete()
        .eq('student_id', student_id);

    if (error) {
        return error;
    }
}

// Gets all trips for a user. Works for past and saved trips.
export const getTrips = async (trip_type, student_id) => {
    const { data, error } = await supabase
        .from(`${trip_type}_Trips`)
        .select()
        .eq('student_id', student_id);

    return {data, error};
}

// Adds a trip for a user. Works for past and saved trips.
export const addTrip = async (trip_type, student_id, business_id, rating) => {
    const { error } = await supabase
        .from(`${trip_type}_Trips`)
        .insert({
            student_id,
            trip_id: business_id,
            rating,
        });

    if (error) {
        return error;
    }
}
