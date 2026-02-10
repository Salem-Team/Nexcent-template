import { Router } from 'express';
import { body } from 'express-validator';
import { login, refresh } from './auth.controller.js';
import { validate } from '../../middlewares/validate.js';

const router = Router();

router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 6 }), validate], login);
router.post('/refresh', [body('refreshToken').isString(), validate], refresh);

export default router;
