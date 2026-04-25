import { categories } from '@/data/mock';

export function CategoryPills() {
  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {categories.map((category) => (
        <button
          key={category.id}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-primary-light)]"
        >
          <span>{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}
