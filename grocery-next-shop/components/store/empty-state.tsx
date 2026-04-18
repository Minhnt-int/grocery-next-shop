import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({ title, description, actionHref = "/products", actionLabel = "Xem sản phẩm" }: EmptyStateProps) {
  return (
    <div className="rounded-[var(--radius)] border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-gray-500">{description}</p>
      <div className="mt-6">
        <Link href={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
      </div>
    </div>
  );
}
