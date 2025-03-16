import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register, loginWithEmail } from "./services/authService";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from "./routes";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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
