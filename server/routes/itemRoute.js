import {Router} from 'express';

import authMiddleware from '../utils/authMiddleware.js';
import { createItem, getItemsByBill } from '../controllers/itemController.js';


const router = Router();

router.use(authMiddleware)

router.post('/createitem', createItem)
router.get('/getallitem/:billId', getItemsByBill)


export default router;