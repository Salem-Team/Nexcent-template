import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware.js';
import { createSale, listSales } from './sales.controller.js';

const router = Router();
router.use(authenticate);
router.get('/', listSales);
router.post('/', createSale);

export default router;
