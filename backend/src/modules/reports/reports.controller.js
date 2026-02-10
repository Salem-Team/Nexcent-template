import { prisma } from '../../config/prisma.js';

export async function salesReport(req, res, next) {
  try {
    const { startDate, endDate } = req.query;
    const report = await prisma.sale.groupBy({
      by: ['saleDate'],
      where: {
        saleDate: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined
        },
        isActive: true
      },
      _sum: { totalAmount: true }
    });
    res.json(report);
  } catch (e) { next(e); }
}

export async function inventoryReport(_req, res, next) {
  try {
    const inventory = await prisma.inventory.findMany({ include: { product: true } });
    res.json(inventory.map((row) => ({
      product: row.product.name,
      sku: row.product.sku,
      quantity: row.quantity,
      stockValue: Number(row.quantity) * Number(row.product.purchasePrice)
    })));
  } catch (e) { next(e); }
}

export async function profitReport(_req, res, next) {
  try {
    const sales = await prisma.saleItem.aggregate({ _sum: { lineTotal: true, unitCost: true, quantity: true } });
    const totalSales = Number(sales._sum.lineTotal || 0);
    const costOfGoods = Number(sales._sum.unitCost || 0) * Number(sales._sum.quantity || 0);
    res.json({ totalSales, costOfGoods, grossProfit: totalSales - costOfGoods });
  } catch (e) { next(e); }
}
