import { z } from "zod";

export const mediaFileSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  publicUrl: z.string().url().or(z.string().startsWith("/")),
  sizeInBytes: z.number().nonnegative().optional(),
});

export const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.coerce.number(),
  discount: z.coerce.number().optional(),
  description: z.string().optional(),
  image: z.array(mediaFileSchema).default([]),
  categories: z.array(categorySchema).default([]),
  rating: z.coerce.number().optional(),
  status: z.enum(["in stock", "out of stock"]).or(z.string()).optional(),
  meta_description: z.string().optional(),
  keywords: z.string().optional(),
  meta_author: z.string().optional(),
  meta_og_title: z.string().optional(),
  meta_og_url: z.string().optional(),
  meta_og_image: z.string().optional(),
  meta_fb_id: z.string().optional(),
  meta_og_sitename: z.string().optional(),
  post_twitter: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  role: z.enum(["admin", "user"]).or(z.string()).optional(),
  disabled: z.boolean().optional(),
  avatar: z.array(mediaFileSchema).default([]),
  wishlist: z.array(z.string()).default([]),
});

export const orderSchema = z.object({
  id: z.string(),
  order_date: z.coerce.date(),
  product: productSchema.or(z.string()),
  user: userSchema.or(z.string()).optional(),
  amount: z.coerce.number().int().positive(),
  status: z.enum(["in cart", "bought"]).or(z.string()),
});

export const feedbackSchema = z.object({
  id: z.string(),
  feedback_date: z.coerce.date().optional(),
  product: productSchema.or(z.string()).optional(),
  user: userSchema.or(z.string()).optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  review: z.string().optional(),
  status: z.enum(["visible", "hidden"]).or(z.string()).optional(),
});

export const blogSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    hero_image: z.array(mediaFileSchema).default([]),
    categories: z.array(categorySchema).default([]),
    status: z.string().optional(),
  })
  .passthrough();

export const pageResultSchema = <T extends z.ZodType>(item: T) =>
  z.object({ rows: z.array(item), count: z.number().optional() });

export const authTokenPayloadSchema = z
  .object({
    id: z.string().optional(),
    email: z.string().email().optional(),
    exp: z.number(),
    role: z.string().optional(),
  })
  .passthrough();

export type MediaFile = z.infer<typeof mediaFileSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type User = z.infer<typeof userSchema>;
export type Order = z.infer<typeof orderSchema>;
export type Feedback = z.infer<typeof feedbackSchema>;
export type Blog = z.infer<typeof blogSchema>;
export type AuthTokenPayload = z.infer<typeof authTokenPayloadSchema>;
export type PageResult<T> = { rows: T[]; count?: number };
