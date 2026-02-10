import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/authMiddleware.js';
import { createPurchase, listPurchases } from './purchases.controller.js';

const router = Router();
router.use(authenticate);
router.get('/', listPurchases);
router.post('/', authorize('admin', 'manager'), createPurchase);

export default router;
