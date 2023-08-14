import {Router} from 'express';
import {getMe, loginUser, registerUser} from '../controllers/authController.js';
import {isAuth} from '../middlewares/authMiddleware.js';

const router = Router ();

router.post ('/register', registerUser);
router.post ('/login', loginUser);
router.get ('/me', isAuth, getMe);

export default router;
