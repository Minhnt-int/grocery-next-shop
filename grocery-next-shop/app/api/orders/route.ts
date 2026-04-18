import { NextResponse } from "next/server";
import { createOrder } from "@/lib/queries/orders";
import type { CreateOrderPayload } from "@/types/order";

export async function POST(request: Request) {
  try {
    const payload: CreateOrderPayload = await request.json();

    if (!payload.customer || !payload.phone || !payload.address || !payload.items || payload.items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await createOrder(payload);

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
