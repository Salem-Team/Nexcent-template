import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware.js';
import { listInventory, listStockMovements } from './inventory.controller.js';

const router = Router();
router.use(authenticate);
router.get('/', listInventory);
router.get('/movements', listStockMovements);

export default router;
