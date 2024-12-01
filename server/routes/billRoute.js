import {Router} from 'express';

import authMiddleware from '../utils/authMiddleware.js';
import { createBill, deleteBill, getAllBill, getBillByBillbook, getBillDetails, updateBill } from '../controllers/billController.js';

const router = Router();

router.use(authMiddleware)

router.post('/createbill', createBill)
router.get('/getallbill', getAllBill)
router.get('/getbillbybillbook/:billbookId', getBillByBillbook)
router.get('/getbilldetails/:billId', getBillDetails)
router.delete('/deletebill/:billId', deleteBill)
router.put('/updatebill', updateBill)

export default router;