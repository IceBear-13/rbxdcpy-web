import db from "../config/db";
import dotenv from "dotenv";
import supabaseAdmin from "../config/supabaseAdmin";

dotenv.config();

export const register = async (email: string, username: string, password: string) => {
  try {
    const { data: authData, error:authError } = await db.auth.signUp({
      email,
      password,
    });

    if(authError) throw authError;

    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([
        {
          id: authData.user!.id,
          username
        }
      ])

    if (profileError) {
      if (profileError.code === '23505') { 
        throw new Error('Username already taken');
      }
      throw profileError;
    }

    console.log(authData.user?.id);

    return { user: authData.user };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    return {
      user: data.user,
      session: data.session
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }

}
