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

dotenv.config();

const router = Router();
const DISCORD_REDIRECT_URL = process.env.DISCORD_REDIRECT_URL as string;

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
    const profile = await  createProfile(newUserID, email, username);
    
    res.status(200).json({data: data, profile: profile});
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.error(error);
  }
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
      res.json(data);
    } else {
      const data = await loginWithUsername(email, password);
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

router.get('/discord', async (req: Request, res: Response) => {
  try{
    const discordRedirectURL = DISCORD_REDIRECT_URL;
    res.redirect(discordRedirectURL);
  } catch(error){
    res.status(500).send('Discord login error: ');
    console.error(error);
  }
})

router.get('/discord/callback', async (req: Request, res: Response) => {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  
})



export default router;
