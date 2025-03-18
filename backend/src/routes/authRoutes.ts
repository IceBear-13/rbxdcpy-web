import app from "../app";
import { Router, Request, Response } from "express";
import {
  register,
  loginWithEmail,
  loginWithUsername,
} from "../services/authService";
import db from "../config/db";

const router = Router();

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
    const { email, username, password } = req.body;
    const data = await register(email, username, password);

    res.json(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.error(error);
  }
});

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
      const { user, session } = await loginWithEmail(email, password);
      res.json({
        user: user,
        session: session,
      });
    } else {
      const { user, session } = await loginWithUsername(email, password);
      res.json({
        user: user,
        session: session,
      });
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
    const discordRedirectURL = process.env.DISCORD_REDIRECT_URL as string;
    const{ data, error } = await db.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: discordRedirectURL,
      }
    })
    
    if (error) throw error;

    res.redirect(discordRedirectURL);

  } catch(error){
    res.status(500).send('Discord login error: ');
    console.error(error);
  }
})

router.get('/discord/callback', async (req: Request, res: Response) => {
  
})



export default router;
