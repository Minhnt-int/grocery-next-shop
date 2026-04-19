import { prisma } from "@/lib/db";
import type { CreateOrderPayload } from "@/types/order";

export async function getAllOrders() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}

export async function getOrderById(id: number) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
}

export async function updateOrderStatus(id: number, status: string) {
  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
}

export async function createOrder(payload: CreateOrderPayload) {
  const { customer, phone, address, note, items } = payload;

  // Calculate total from DB prices
  let total = 0;
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });
    if (product) {
      total += product.price * item.quantity;
    }
  }

  const order = await prisma.order.create({
    data: {
      customer,
      phone,
      address,
      note,
      total,
      status: "pending",
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: 0, // Will be updated below
        })),
      },
    },
    include: {
      items: true,
    },
  });

  // Update prices for order items
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });
    if (product) {
      await prisma.orderItem.updateMany({
        where: {
          orderId: order.id,
          productId: item.productId,
        },
        data: {
          price: product.price,
        },
      });
    }
  }

  return order;
}
