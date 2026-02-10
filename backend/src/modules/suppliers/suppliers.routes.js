import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/authMiddleware.js';
import { createSupplier, listSuppliers } from './suppliers.controller.js';

const router = Router();
router.use(authenticate);
router.get('/', listSuppliers);
router.post('/', authorize('admin', 'manager'), createSupplier);

export default router;
