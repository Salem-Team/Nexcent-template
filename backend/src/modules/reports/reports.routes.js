import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/authMiddleware.js';
import { inventoryReport, profitReport, salesReport } from './reports.controller.js';

const router = Router();
router.use(authenticate, authorize('admin', 'manager'));
router.get('/sales', salesReport);
router.get('/inventory', inventoryReport);
router.get('/profit', profitReport);

export default router;
