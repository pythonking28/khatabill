import {Router} from 'express';
import { createBillBook, deleteBillbook, getAllBillbooks, updateBillbook } from '../controllers/billbookController.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = Router();

router.use(authMiddleware)

router.post('/create', createBillBook)
router.get('/getallbillbook', getAllBillbooks)
router.put('/updatebillbook/:billbookId', updateBillbook)
router.delete('/deletebillbook/:billbookId', deleteBillbook)

export default router;