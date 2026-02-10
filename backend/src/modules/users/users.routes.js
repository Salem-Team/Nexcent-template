import { Router } from 'express';
import { body } from 'express-validator';
import { createUser, deactivateUser, listUsers } from './users.controller.js';
import { authenticate, authorize } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();
router.use(authenticate, authorize('admin'));
router.get('/', listUsers);
router.post('/', [body('fullName').isString(), body('email').isEmail(), body('password').isLength({ min: 6 }), body('roleId').isInt(), validate], createUser);
router.patch('/:id/deactivate', deactivateUser);

export default router;
