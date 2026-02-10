import { prisma } from '../../config/prisma.js';

export async function listCustomers(_req, res, next) {
  try { res.json(await prisma.customer.findMany({ where: { isActive: true } })); } catch (e) { next(e); }
}
export async function createCustomer(req, res, next) {
  try { res.status(201).json(await prisma.customer.create({ data: req.body })); } catch (e) { next(e); }
}
