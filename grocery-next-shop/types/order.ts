export type CreateOrderPayload = {
  customer: string;
  phone: string;
  address: string;
  note?: string;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
};
