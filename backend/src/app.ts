import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register, loginWithEmail } from "./services/authService";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from "./routes";
import cookieParser from "cookie-parser";
import { authToken } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
app.use(cors({
  credentials: true,
  origin: [process.env.FRONTEND_URL as string, 'http://localhost:5173'], // Specify allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

const swaggerOptions: swaggerJsDoc.Options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API Documentation',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        }
      ]
    },
    apis: ['./src/routes/*.ts'], // Path to your route files
};
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', router);

router.get('/', async (req: Request, res: Response) => {
    res.json('fuck playboi carti');
    console.log('playboi carti');
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;
