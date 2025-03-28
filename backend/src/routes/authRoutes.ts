import app from "../app";
import { Router, Request, Response } from "express";
import {
  register,
  loginWithEmail,
  loginWithUsername,
  createProfile,
  loginWithDiscord,
} from "../services/authService";
import db from "../config/db";
import axios from "axios";
import dotenv from "dotenv";
import supabaseAdmin from "../config/supabaseAdmin";
import jwt from "jsonwebtoken";

dotenv.config();

const router = Router();
const DISCORD_REDIRECT_URL = process.env.DISCORD_REDIRECT_URL as string;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;
const DISCORD_CLIENT_KEY = process.env.DISCORD_CLIENT_KEY as string;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const DISCORD_ENDPOINT_URI = process.env.DISCORD_ENDPOINT_URI

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  maxAge: 24 * 60 * 60 * 1000, 
  path: '/'
};


/**
 * @swagger
 * /verify-auth:
 *   get:
 *     summary: Verify the validity of a user's token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User verified successfully
 *       401:
 *         description: User is not verified
 */
router.post('/verify-auth', (req: Request, res: Response) =>{
  // console.log('requested once');
  const { token } = req.body
  // console.log(token);
  if(!token || token === '') {
    res.status(401).json({ authenticated: false, message: 'No token provided' });
    return;
  }
  try{
    const user = jwt.verify(token, JWT_SECRET_KEY);
    res.status(200).json({authenticated: true, user: user});
    // console.log(user);
  } catch(error){
    res.status(401).json({ authenticated: false, message: 'Invalid token' });
  }
})
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const newUserID = crypto.randomUUID();
    const { email, username, password } = req.body;
    const data = await register(newUserID, email, username, password);
    const profile = await createProfile(newUserID, email, username);

    const payload = {
      sub: newUserID,
      username: username,
      email: email,
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY);

    res.cookie("token", token);
    res.status(200).json({ data: data, profile: profile, token: token});
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.error(error);
  }
});

router.post('/logout', async (req: Request, res: Response) => {
  try{
    const { maxAge, ...cookieOptionsForClearing } = COOKIE_OPTIONS
    res.clearCookie('token', cookieOptionsForClearing);
    res.status(200).json({logout: 'success'});
  } catch(error){
    throw error;
  }
})

router.get('/check-cookies', (req: Request, res: Response) => {
  res.status(200).json({
    cookies: req.cookies,
    hasCookie: !!req.cookies.token
  });
});

// Define the router with consistent naming

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       500:
 *         description: Internal server error
 */
router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const isEmail = email.includes("@");

    if (isEmail) {
      const data = await loginWithEmail(email, password);
      if(!data) throw new Error('login failed')
      res.cookie('token', data.token, COOKIE_OPTIONS)
      res.json(data);
    } else {
      const data = await loginWithUsername(email, password);
      if(!data) throw new Error('login failed');
      res.cookie('token', data.token, COOKIE_OPTIONS);
      res.json(data);
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /discord:
 *   get:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       500:
 *         description: Internal server error
 */

router.get("/discord", async (req: Request, res: Response) => {
  try {
    const discordRedirectURL = DISCORD_REDIRECT_URL;
    res.redirect(discordRedirectURL);
  } catch (error) {
    res.status(500).send("Discord login error: ");
    console.error(error);
  }
});

router.get("/discord/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code;
    const clientId = DISCORD_CLIENT_KEY;
    const clientSecret = DISCORD_CLIENT_SECRET;
    const discordRedirectURL = DISCORD_ENDPOINT_URI;

    console.log(discordRedirectURL);

    if (!clientId || !clientSecret || !discordRedirectURL) {
      throw new Error("Missing Discord OAuth environment variables");
    }

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code as string,
      redirect_uri: discordRedirectURL,
    });

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      params,
      {
        headers,
      },
    );

    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });

    const { id, username, avatar, email } = userResponse.data;

    const { data: userData, error } = await supabaseAdmin
      .from("users")
      .select("username, email")
      .eq("discord_id", id);
    if (error) {
      throw error;
    }

    let userId = id;
    
    if (userData.length === 0) {
      userId = crypto.randomUUID();
      await supabaseAdmin.from("users").insert({
        id: userId,
        email: email,
        username: username,
        discord_id: id  // Store the Discord ID
      });

      await supabaseAdmin.from("profiles").insert({
        id: userId,
        avatar_url: avatar,
        email: email,
        display_name: username,
      });
    }

    const payload = {
      sub: userId,
      username: username,
      email: email,
      provider: "discord",
    };
    const token = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24h" });
    res.cookie("token", token, COOKIE_OPTIONS);
    res.redirect(`${FRONTEND_URL}/test`);
  } catch (error) {
    console.error("Error: ", error);
    // Provide an error response to the client
    res.status(500).json({ error: error});
  }
});


export default router;
