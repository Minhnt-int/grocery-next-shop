import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { name, icon, banner, description, metaTitle, metaDesc, metaKeywords, slug: newSlug } = body;

    const category = await prisma.category.update({
      where: { slug },
      data: {
        name,
        slug: newSlug,
        icon: icon || null,
        banner: banner || null,
        description: description || null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        metaKeywords: metaKeywords || null,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    await prisma.category.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
