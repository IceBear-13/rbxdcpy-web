import db from "../config/db";
import dotenv from "dotenv";
import supabaseAdmin from "../config/supabaseAdmin";
import { hashPassword, verifyPassword } from "../middleware/authMiddleware";
import crypto from "crypto";
import jwt from "jsonwebtoken"
import { Request, Response } from "express";
// import { validateEmail, validateUsername, validatePassword } from "../utils/validation"; // Assume these validation functions exist

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const register = async (userID: string, email: string, username: string, password: string) => {
  // ts pmo sb dude I didn't realize the profile id key was still referencing another table's primary key in the db :(
  try {
    const encrypted_password = await hashPassword(password);

    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        id: userID,
        email: email, 
        username: username, 
        encrypted_password: encrypted_password
      });

    if (userError) throw userError;

    return {userID: userID}

  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const createProfile = async (id: string, email: string, username: string) => {
  try{
    const { data: profileData, error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: id,
      email: email,
      display_name: username
    });
    if (profileError) {
      console.error('Profile insertion error: ', profileError);
      throw profileError;
    }
    return username;
  } catch(error){
    console.error(error);
  }

};


export const loginWithEmail = async (email: string, password: string) => {
  try {
    const { data: loginData, error: loginError } = await supabaseAdmin
      .from('users')
      .select('encrypted_password')
      .eq('email', email);

    if (!loginData || loginData.length === 0) {
      throw new Error('User not found');
    }

    const pass = await verifyPassword(password, loginData[0].encrypted_password)

    if(pass){
      const { data: userData, error: userError } = await supabaseAdmin
        .from('users')
        .select('id, username')
        .eq('email', email);

      if (userError) throw userError;

      const userID = userData[0].id;
      const username = userData[0].username;

      const payload = {
        userId: userID,
        username: username,
        email: email
      }

      const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '24h'})

      return {
        success: true,
        token: token,
        user: {
          userID: userID,
          username: username,
          email: email,
        }
      }
    }

    return {
      success: false,
      token: null,
      user: null
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }

}

export const loginWithUsername = async (username: string, password: string) => {
  try{
    const { data: loginData, error: loginError } = await supabaseAdmin
      .from('users')
      .select('encrypted_password')
      .eq('username', username)

    if(!loginData || loginData.length === 0){
      throw new Error('User not found');
    }

    const pass = await verifyPassword(password, loginData[0].encrypted_password);

    if(pass){
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, email')
        .eq('username', username)

      
      if(error) throw error;

      const id = data[0].id;
      const email = data[0].email;

      const payload = {
        userId: id,
        username: username,
        email: email
      }

      const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '24h'});

      return {
        success: true,
        token: token,
        user: payload
      }

    }

    return{
      success: false,
      token: null,
      user: null
    }


  } catch(error){
    console.error('Login error:', error);
    throw error;
  }
}


export const loginWithDiscord = async (req: Request, res: Response) => {
  const discordRedirectURL = process.env.DISCORD_REDIRECT_URL as string;
  return res.redirect(discordRedirectURL);
}
