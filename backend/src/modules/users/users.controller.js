import bcrypt from 'bcrypt';
import { prisma } from '../../config/prisma.js';

export async function listUsers(_req, res, next) {
  try {
    const users = await prisma.user.findMany({ include: { role: true } });
    res.json(users);
  } catch (e) { next(e); }
}

export async function createUser(req, res, next) {
  try {
    const { fullName, email, password, roleId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { fullName, email, passwordHash, roleId } });
    res.status(201).json(user);
  } catch (e) { next(e); }
}

export async function deactivateUser(req, res, next) {
  try {
    const user = await prisma.user.update({ where: { id: Number(req.params.id) }, data: { isActive: false } });
    res.json(user);
  } catch (e) { next(e); }
}
