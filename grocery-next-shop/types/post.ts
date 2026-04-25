export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  published: boolean;
  metaTitle?: string | null;
  metaDesc?: string | null;
  metaKeywords?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
