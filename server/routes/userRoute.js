import { registerUser, signInuser, getUser, verifyUser } from "../controllers/userController.js";
import authMiddleware from "../utils/authMiddleware.js";
import {Router} from 'express';

const router = Router();

router.post('/register', registerUser);
router.post('/login', signInuser);
router.get('/getuser',authMiddleware, getUser);
router.get('/verifyuser', verifyUser)

export default router;