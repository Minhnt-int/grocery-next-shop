"use client";

import { Button } from "@/components/ui/button";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function QuantityInput({ value, onChange }: QuantityInputProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-200 overflow-hidden">
      <Button variant="ghost" type="button" className="rounded-none px-3" onClick={() => onChange(Math.max(1, value - 1))}>
        -
      </Button>
      <div className="min-w-12 text-center text-sm font-medium">{value}</div>
      <Button variant="ghost" type="button" className="rounded-none px-3" onClick={() => onChange(value + 1)}>
        +
      </Button>
    </div>
  );
}
