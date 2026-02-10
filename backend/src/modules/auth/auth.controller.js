import bcrypt from 'bcrypt';
import { prisma } from '../../config/prisma.js';
import { ApiError } from '../../utils/ApiError.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/auth.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
    if (!user || !user.isActive) throw new ApiError(401, 'Invalid credentials');

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) throw new ApiError(401, 'Invalid credentials');

    const payload = { sub: user.id, role: user.role.name, email: user.email };
    return res.json({
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role.name }
    });
  } catch (error) {
    return next(error);
  }
}

export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const payload = verifyRefreshToken(refreshToken);
    return res.json({ accessToken: signAccessToken({ sub: payload.sub, role: payload.role, email: payload.email }) });
  } catch (error) {
    return next(new ApiError(401, 'Invalid refresh token'));
  }
}
