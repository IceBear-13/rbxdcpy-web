import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register, loginWithEmail } from "./services/authService";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', async (req: Request, res: Response) => {
  try{
    const { email, username, password } = req.body;
    const data = await register(email, username, password);

    res.json(data);
  } catch(error){
    console.error(error);
  }
})

app.post('/signin', async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const { user, session } = await loginWithEmail(email, password);

    } catch(error){
        console.error(error);
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;
