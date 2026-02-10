import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware.js';
import { createCustomer, listCustomers } from './customers.controller.js';

const router = Router();
router.use(authenticate);
router.get('/', listCustomers);
router.post('/', createCustomer);

export default router;
