import { verifyAccessToken } from '../utils/auth.js';
import { ApiError } from '../utils/ApiError.js';

export function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Unauthorized'));
  }

  try {
    req.user = verifyAccessToken(authHeader.split(' ')[1]);
    return next();
  } catch {
    return next(new ApiError(401, 'Invalid token'));
  }
}

export function authorize(...allowedRoles) {
  return (req, _res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden'));
    }
    return next();
  };
}
