/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Seed news posts
  await prisma.post.createMany({
    data: [
      {
        title: 'Khuyến mãi lớn mùa hè - Giảm đến 30%',
        slug: 'khuyen-mai-lon-mua-he-giam-den-30',
        excerpt: 'Chương trình khuyến mãi hấp dẫn nhất trong năm với hàng trăm sản phẩm giảm giá sâu.',
        content: `
          <h2>Chương trình khuyến mãi mùa hè đã trở lại!</h2>
          <p>Từ ngày 15/4 đến 30/4, chúng tôi mang đến cho bạn chương trình khuyến mãi lớn nhất trong năm với:</p>
          <ul>
            <li>Giảm đến 30% cho tất cả sản phẩm rau củ hữu cơ</li>
            <li>Mua 2 tặng 1 cho các sản phẩm đồ uống</li>
            <li>Freeship cho đơn hàng từ 200.000đ</li>
            <li>Tích điểm nhân đôi cho thành viên VIP</li>
          </ul>
          <p>Đừng bỏ lỡ cơ hội tuyệt vời này!</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop',
        published: true,
        metaTitle: 'Khuyến mãi mùa hè - Giảm đến 30% tất cả sản phẩm',
        metaDesc: 'Chương trình khuyến mãi lớn nhất năm với giảm giá sâu, freeship và quà tặng hấp dẫn.',
        metaKeywords: 'khuyến mãi, giảm giá, mua sắm, tạp hóa',
      },
      {
        title: '5 mẹo chọn rau củ tươi ngon cho bữa ăn gia đình',
        slug: '5-meo-chon-rau-cu-tuoi-ngon',
        excerpt: 'Hướng dẫn chi tiết cách chọn rau củ tươi ngon, đảm bảo dinh dưỡng cho cả nhà.',
        content: `
          <h2>Bí quyết chọn rau củ tươi ngon</h2>
          <p>Việc chọn được rau củ tươi ngon không chỉ giúp bữa ăn ngon miệng mà còn đảm bảo dinh dưỡng cho gia đình.</p>
          <h3>1. Quan sát màu sắc</h3>
          <p>Rau củ tươi thường có màu sắc tự nhiên, không bị úa vàng hay có đốm đen.</p>
          <h3>2. Kiểm tra độ cứng</h3>
          <p>Rau củ tươi khi sờ vào sẽ cứng, không bị nhũn hay mềm.</p>
          <h3>3. Ngửi mùi</h3>
          <p>Rau củ tươi có mùi thơm tự nhiên, không có mùi hôi hay lạ.</p>
          <h3>4. Chọn theo mùa</h3>
          <p>Rau củ theo mùa thường tươi ngon và giá cả hợp lý hơn.</p>
          <h3>5. Mua ở nguồn uy tín</h3>
          <p>Chọn cửa hàng có nguồn gốc rõ ràng để đảm bảo chất lượng.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop',
        published: true,
        metaTitle: '5 mẹo chọn rau củ tươi ngon cho bữa ăn gia đình',
        metaDesc: 'Hướng dẫn chi tiết cách chọn rau củ tươi ngon, đảm bảo an toàn vệ sinh thực phẩm.',
        metaKeywords: 'rau củ, mẹo vặt, mua sắm, ẩm thực',
      },
      {
        title: 'Gạo ST25 - Niềm tự hào Việt Nam được thế giới công nhận',
        slug: 'gao-st25-niem-tu-hao-viet-nam',
        excerpt: 'Tìm hiểu về giống gạo ST25 đoạt giải gạo ngon nhất thế giới và lý do bạn nên chọn.',
        content: `
          <h2>Gạo ST25 - Hạt gạo vàng của Việt Nam</h2>
          <p>Gạo ST25 là giống gạo được lai tạo bởi kỹ sư Hồ Quang Cua, đoạt giải "Gạo ngon nhất thế giới" năm 2019.</p>
          <h3>Đặc điểm nổi bật</h3>
          <ul>
            <li>Hạt dài, trắng trong, không bạc bụng</li>
            <li>Thơm tự nhiên, không cần ủ</li>
            <li>Dẻo mềm, ngọt thanh</li>
            <li>Giá trị dinh dưỡng cao</li>
          </ul>
          <h3>Cách nấu gạo ST25 ngon</h3>
          <p>Vo gạo nhẹ nhàng 1-2 lần, ngâm 15 phút trước khi nấu. Tỷ lệ nước/gạo là 1:1 để có cơm dẻo vừa phải.</p>
          <p>Hiện tại cửa hàng chúng tôi đang có chương trình khuyến mãi đặc biệt cho gạo ST25!</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31d?w=800&auto=format&fit=crop',
        published: true,
        metaTitle: 'Gạo ST25 - Gạo ngon nhất thế giới đến từ Việt Nam',
        metaDesc: 'Tìm hiểu về gạo ST25 đoạt giải thế giới, đặc điểm và cách nấu ngon nhất.',
        metaKeywords: 'gạo ST25, gạo ngon, gạo Việt Nam, nấu cơm',
      },
      {
        title: 'Bảo quản thực phẩm đúng cách trong mùa nóng',
        slug: 'bao-quan-thuc-pham-dung-cach-mua-nong',
        excerpt: 'Hướng dẫn cách bảo quản thực phẩm tươi lâu và an toàn trong những ngày hè nóng bức.',
        content: `
          <h2>Mẹo bảo quản thực phẩm mùa hè</h2>
          <p>Thời tiết nóng ẩm là điều kiện thuận lợi cho vi khuẩn phát triển. Dưới đây là những mẹo giúp bạn bảo quản thực phẩm tốt hơn:</p>
          <h3>Rau củ quả</h3>
          <ul>
            <li>Rửa sạch, để ráo nước trước khi cho vào tủ lạnh</li>
            <li>Dùng túi zip hoặc hộp kín để tránh mất nước</li>
            <li>Không rửa trước khi bảo quản lâu ngày</li>
          </ul>
          <h3>Thực phẩm khô</h3>
          <ul>
            <li>Bảo quản nơi khô ráo, thoáng mát</li>
            <li>Dùng hộp kín để tránh ẩm mốc</li>
            <li>Kiểm tra hạn sử dụng thường xuyên</li>
          </ul>
          <h3>Đồ uống</h3>
          <ul>
            <li>Để nơi thoáng mát, tránh ánh nắng trực tiếp</li>
            <li>Sau khi mở nắp nên bảo quản trong tủ lạnh</li>
          </ul>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=800&auto=format&fit=crop',
        published: true,
        metaTitle: 'Cách bảo quản thực phẩm đúng cách trong mùa hè',
        metaDesc: 'Hướng dẫn chi tiết cách bảo quản rau củ, thực phẩm khô và đồ uống an toàn trong mùa nóng.',
        metaKeywords: 'bảo quản thực phẩm, mùa hè, an toàn thực phẩm',
      },
      {
        title: 'Ra mắt dịch vụ giao hàng siêu tốc 30 phút',
        slug: 'ra-mat-dich-vu-giao-hang-sieu-toc-30-phut',
        excerpt: 'Chúng tôi tự hào giới thiệu dịch vụ giao hàng siêu tốc mới - đặt hàng và nhận trong 30 phút!',
        content: `
          <h2>Giao hàng siêu tốc - Tươi ngon đến tận nhà trong 30 phút</h2>
          <p>Từ ngày 20/4, chúng tôi chính thức ra mắt dịch vụ giao hàng siêu tốc với cam kết:</p>
          <ul>
            <li>Giao hàng trong vòng 30 phút kể từ khi đặt</li>
            <li>Miễn phí ship cho đơn từ 150.000đ</li>
            <li>Đảm bảo sản phẩm tươi ngon như mới mua</li>
            <li>Hoàn tiền 100% nếu giao trễ</li>
          </ul>
          <h3>Khu vực áp dụng</h3>
          <p>Hiện tại dịch vụ đang áp dụng cho các quận nội thành. Chúng tôi sẽ mở rộng ra các khu vực khác trong thời gian tới.</p>
          <h3>Cách đặt hàng</h3>
          <p>Đặt hàng trực tuyến qua website hoặc app, chọn "Giao siêu tốc 30 phút" khi thanh toán.</p>
          <p>Trải nghiệm ngay hôm nay!</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&auto=format&fit=crop',
        published: true,
        metaTitle: 'Dịch vụ giao hàng siêu tốc 30 phút - Tươi ngon đến tận nhà',
        metaDesc: 'Ra mắt dịch vụ giao hàng siêu tốc 30 phút, miễn phí ship, hoàn tiền nếu trễ.',
        metaKeywords: 'giao hàng nhanh, ship nhanh, giao hàng tận nhà, freeship',
      },
    ],
  });

  console.log('✅ News posts seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
