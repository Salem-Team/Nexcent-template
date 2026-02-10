import { validationResult } from 'express-validator';

export function validate(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ statusCode: 400, message: 'Validation error', errors: errors.array() });
  }
  return next();
}
