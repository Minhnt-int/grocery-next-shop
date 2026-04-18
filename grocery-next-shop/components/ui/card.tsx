import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-surface)] rounded-[var(--radius)] shadow-sm border border-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
