import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] p-8 md:p-12">
      <div className="max-w-2xl">
        <p className="mb-3 inline-block rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm font-medium text-[var(--color-primary)]">
          🚚 Giao nhanh trong 2 giờ
        </p>
        <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
          Hàng tươi mỗi ngày,
          <span className="text-[var(--color-primary)]"> mua sắm cực tiện!</span>
        </h1>
        <p className="mt-4 text-[var(--color-text-secondary)] md:text-lg">
          Từ rau củ, đồ uống đến gia vị - tất cả đều có mặt tại GroceryShop.
          Chất lượng chọn lọc, giao tận cửa.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white hover:bg-[var(--color-primary-dark)]"
          >
            Mua ngay
          </Link>
          <Link
            href="/admin"
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 font-semibold hover:bg-white/80"
          >
            Quản trị cửa hàng
          </Link>
        </div>
      </div>
    </section>
  );
}
