import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAllCategories } from "@/lib/queries/categories";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, icon, banner, description, metaTitle, metaDesc, metaKeywords } = body;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
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
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
