import { prisma } from '../../config/prisma.js';
import { ApiError } from '../../utils/ApiError.js';

export async function listSales(_req, res, next) {
  try {
    const sales = await prisma.sale.findMany({ include: { customer: true, items: true }, orderBy: { createdAt: 'desc' } });
    res.json(sales);
  } catch (e) { next(e); }
}

export async function createSale(req, res, next) {
  try {
    const { customerId, tax = 0, paidAmount = 0, items } = req.body;
    if (!Array.isArray(items) || items.length === 0) throw new ApiError(400, 'Items are required');

    const products = await prisma.product.findMany({ where: { id: { in: items.map((i) => i.productId) } } });
    const inventoryRows = await prisma.inventory.findMany({ where: { productId: { in: items.map((i) => i.productId) } } });
    const inventoryMap = new Map(inventoryRows.map((i) => [i.productId, i.quantity]));
    const productMap = new Map(products.map((p) => [p.id, p]));

    for (const item of items) {
      if ((inventoryMap.get(item.productId) || 0) < item.quantity) {
        throw new ApiError(400, `Insufficient stock for product ${item.productId}`);
      }
    }

    const subtotal = items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.unitPrice), 0);
    const totalAmount = subtotal + Number(tax);

    const sale = await prisma.$transaction(async (tx) => {
      const createdSale = await tx.sale.create({
        data: {
          customerId,
          subtotal,
          tax,
          totalAmount,
          paidAmount,
          soldById: req.user.sub,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              unitCost: productMap.get(item.productId).purchasePrice,
              lineTotal: Number(item.quantity) * Number(item.unitPrice)
            }))
          }
        },
        include: { items: true }
      });

      for (const item of items) {
        await tx.inventory.update({ where: { productId: item.productId }, data: { quantity: { decrement: item.quantity } } });
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            movementType: 'OUT',
            quantity: item.quantity,
            referenceType: 'SALE',
            referenceId: createdSale.id
          }
        });
      }

      await tx.customer.update({
        where: { id: customerId },
        data: { balance: { increment: totalAmount - Number(paidAmount) } }
      });

      return createdSale;
    });

    res.status(201).json(sale);
  } catch (e) { next(e); }
}
