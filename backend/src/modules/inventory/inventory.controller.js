import { prisma } from '../../config/prisma.js';

export async function listInventory(_req, res, next) {
  try {
    const inventory = await prisma.inventory.findMany({
      where: { isActive: true },
      include: { product: true }
    });
    res.json(inventory);
  } catch (e) { next(e); }
}

export async function listStockMovements(_req, res, next) {
  try {
    const data = await prisma.stockMovement.findMany({ include: { product: true }, orderBy: { createdAt: 'desc' } });
    res.json(data);
  } catch (e) { next(e); }
}
