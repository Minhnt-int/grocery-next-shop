import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAllProducts, getFeaturedProducts, getFlashSaleProducts, getProductsByCategory, searchProducts } from "@/lib/queries/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const flashSale = searchParams.get("flashSale");
    const sale = searchParams.get("sale");
    const search = searchParams.get("search");
    const saleOnly = sale === "true" || flashSale === "true";

    let products;

    if (search) {
      products = await searchProducts(search, saleOnly);
    } else if (saleOnly) {
      products = await getFlashSaleProducts();
    } else if (featured === "true") {
      products = await getFeaturedProducts();
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      price,
      stock,
      image,
      description,
      content,
      categoryId,
      isFeatured,
      isFlashSale,
      metaTitle,
      metaDesc,
      metaKeywords,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price,
        stock,
        image,
        description,
        content: content || null,
        categoryId,
        isFeatured: isFeatured || false,
        isFlashSale: isFlashSale || false,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        metaKeywords: metaKeywords || null,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
