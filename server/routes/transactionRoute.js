import {Router} from 'express';

import authMiddleware from '../utils/authMiddleware.js';
import { createTransaction, getTransactionByBill, getAllTransaction } from '../controllers/transactionController.js';


const router = Router();

router.use(authMiddleware)

router.post('/createtransaction', createTransaction)
router.get('/getalltransaction/:billId', getTransactionByBill)
router.get('/getalltransaction', getAllTransaction)


export default router;