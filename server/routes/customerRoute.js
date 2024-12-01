import {Router} from 'express';
import authMiddleware from '../utils/authMiddleware.js';
import { createCustomer, getCustomerDetail, updateCustomer } from '../controllers/customerController.js';

const router = Router();

router.use(authMiddleware)

router.post('/createcustomer',createCustomer)
router.get('/getcustomer/:customerId', getCustomerDetail)
router.put('/updatecustomer/:customerId', updateCustomer)


export default router;