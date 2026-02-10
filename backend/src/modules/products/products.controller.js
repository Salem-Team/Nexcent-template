import { prisma } from '../../config/prisma.js';

export async function listProducts(_req, res, next) {
  try {
    const data = await prisma.product.findMany({ where: { isActive: true } });
    res.json(data);
  } catch (e) { next(e); }
}

export async function createProduct(req, res, next) {
  try {
    const product = await prisma.product.create({ data: req.body });
    await prisma.inventory.create({ data: { productId: product.id, quantity: 0 } });
    res.status(201).json(product);
  } catch (e) { next(e); }
}

export async function updateProduct(req, res, next) {
  try {
    const data = await prisma.product.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(data);
  } catch (e) { next(e); }
}

export async function deactivateProduct(req, res, next) {
  try {
    const data = await prisma.product.update({ where: { id: Number(req.params.id) }, data: { isActive: false } });
    res.json(data);
  } catch (e) { next(e); }
}
