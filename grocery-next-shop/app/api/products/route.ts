import { NextResponse } from "next/server";
import { getAllProducts, getFeaturedProducts, getFlashSaleProducts, getProductsByCategory } from "@/lib/queries/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const flashSale = searchParams.get("flashSale");

    let products;

    if (featured === "true") {
      products = await getFeaturedProducts();
    } else if (flashSale === "true") {
      products = await getFlashSaleProducts();
    } else if (category) {
      products = await getProductsByCategory(category);
    } else {
      products = await getAllProducts();
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
