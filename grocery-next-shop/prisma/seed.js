/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = await prisma.$transaction([
    prisma.category.create({ data: { name: 'Rau Củ', slug: 'rau-cu', icon: '🥬' } }),
    prisma.category.create({ data: { name: 'Đồ Uống', slug: 'do-uong', icon: '🥤' } }),
    prisma.category.create({ data: { name: 'Gạo & Ngũ Cốc', slug: 'gao-ngu-coc', icon: '🍚' } }),
    prisma.category.create({ data: { name: 'Gia Vị', slug: 'gia-vi', icon: '🧂' } }),
  ]);

  await prisma.product.createMany({
    data: [
      {
        name: 'Cà chua hữu cơ Đà Lạt',
        slug: 'ca-chua-huu-co-da-lat',
        price: 35000,
        stock: 120,
        image: 'https://images.unsplash.com/photo-1546470427-22797b77f73b?w=600&auto=format&fit=crop',
        description: 'Cà chua tươi, ngọt tự nhiên, phù hợp salad và nấu canh.',
        categoryId: categories[0].id,
        isFeatured: true,
      },
      {
        name: 'Nước cam ép nguyên chất',
        slug: 'nuoc-cam-ep-nguyen-chat',
        price: 45000,
        stock: 80,
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop',
        description: '100% cam tươi, không đường, giàu vitamin C.',
        categoryId: categories[1].id,
        isFeatured: true,
        isFlashSale: true,
      },
      {
        name: 'Gạo ST25 thượng hạng 5kg',
        slug: 'gao-st25-thuong-hang-5kg',
        price: 195000,
        stock: 40,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31d?w=600&auto=format&fit=crop',
        description: 'Gạo thơm, dẻo, chuẩn chất lượng cao cấp.',
        categoryId: categories[2].id,
        isFlashSale: true,
      },
      {
        name: 'Muối hồng Himalaya',
        slug: 'muoi-hong-himalaya',
        price: 65000,
        stock: 55,
        image: 'https://images.unsplash.com/photo-1518110925495-5fe2e53b8f96?w=600&auto=format&fit=crop',
        description: 'Gia vị cao cấp giúp bữa ăn thêm đậm đà.',
        categoryId: categories[3].id,
        isFeatured: true,
      },
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
