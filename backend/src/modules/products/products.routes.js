import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, deactivateProduct, listProducts, updateProduct } from './products.controller.js';
import { authenticate, authorize } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();
router.use(authenticate);
router.get('/', listProducts);
router.post('/', authorize('admin', 'manager'), [body('name').isString(), body('sku').isString(), body('purchasePrice').isDecimal(), body('sellingPrice').isDecimal(), validate], createProduct);
router.put('/:id', authorize('admin', 'manager'), updateProduct);
router.patch('/:id/deactivate', authorize('admin', 'manager'), deactivateProduct);

export default router;
