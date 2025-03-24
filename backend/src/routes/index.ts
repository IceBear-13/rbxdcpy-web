import { Request, Response, Router } from 'express';
import authRoutes from './authRoutes';
import userRoute from './userRoute'
import { AuthRequest, authToken } from '../middleware/authMiddleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', userRoute)

router.get('/protected', authToken, async (req: AuthRequest, res: Response) =>{
    const user = req.user;
    res.json({
        user
    });
})

export default router;