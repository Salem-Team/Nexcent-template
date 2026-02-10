import { prisma } from '../../config/prisma.js';
import { ApiError } from '../../utils/ApiError.js';

export async function listPurchases(_req, res, next) {
  try {
    const purchases = await prisma.purchase.findMany({ include: { supplier: true, items: true }, orderBy: { createdAt: 'desc' } });
    res.json(purchases);
  } catch (e) { next(e); }
}

export async function createPurchase(req, res, next) {
  try {
    const { supplierId, tax = 0, paidAmount = 0, items } = req.body;
    if (!Array.isArray(items) || items.length === 0) throw new ApiError(400, 'Items are required');

    const subtotal = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.unitCost), 0);
    const totalAmount = subtotal + Number(tax);

    const result = await prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: {
          supplierId,
          subtotal,
          tax,
          totalAmount,
          paidAmount,
          createdById: req.user.sub,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitCost: item.unitCost,
              lineTotal: Number(item.quantity) * Number(item.unitCost)
            }))
          }
        },
        include: { items: true }
      });

      for (const item of items) {
        await tx.inventory.update({ where: { productId: item.productId }, data: { quantity: { increment: item.quantity } } });
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            movementType: 'IN',
            quantity: item.quantity,
            referenceType: 'PURCHASE',
            referenceId: purchase.id
          }
        });
      }

      await tx.supplier.update({
        where: { id: supplierId },
        data: { balance: { increment: totalAmount - Number(paidAmount) } }
      });

      return purchase;
    });

    res.status(201).json(result);
  } catch (e) { next(e); }
}
