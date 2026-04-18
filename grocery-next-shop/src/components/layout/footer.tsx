export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-8 text-sm md:grid-cols-3 md:px-6">
        <div>
          <h3 className="font-semibold">GroceryShop</h3>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Tạp hóa online thân thiện, giao nhanh trong ngày.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Hỗ trợ</h3>
          <ul className="mt-2 space-y-1 text-[var(--color-text-secondary)]">
            <li>Chính sách giao hàng</li>
            <li>Đổi trả & hoàn tiền</li>
            <li>Liên hệ hỗ trợ 24/7</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Liên hệ</h3>
          <p className="mt-2 text-[var(--color-text-secondary)]">Email: support@groceryshop.vn</p>
          <p className="text-[var(--color-text-secondary)]">Hotline: 1900 1234</p>
        </div>
      </div>
    </footer>
  );
}
