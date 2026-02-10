import { prisma } from '../../config/prisma.js';

export async function listSuppliers(_req, res, next) {
  try { res.json(await prisma.supplier.findMany({ where: { isActive: true } })); } catch (e) { next(e); }
}
export async function createSupplier(req, res, next) {
  try { res.status(201).json(await prisma.supplier.create({ data: req.body })); } catch (e) { next(e); }
}
