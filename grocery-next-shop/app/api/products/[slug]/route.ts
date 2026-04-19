import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getProductBySlug } from "@/lib/queries/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const {
      name,
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
      slug: newSlug,
    } = body;

    const product = await prisma.product.update({
      where: { slug },
      data: {
        name,
        slug: newSlug,
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
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    await prisma.product.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
