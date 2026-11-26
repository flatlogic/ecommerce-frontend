import { describe, expect, it } from "vitest";
import {
  authTokenPayloadSchema,
  pageResultSchema,
  productSchema,
  userSchema,
} from "@/types/domain";

describe("domain schemas", () => {
  it("normalizes a product response and applies collection defaults", () => {
    const product = productSchema.parse({
      id: "product-1",
      title: "Chair",
      price: "79.50",
    });
    expect(product).toMatchObject({
      id: "product-1",
      price: 79.5,
      image: [],
      categories: [],
    });
  });

  it("accepts null SEO text in a catalog page and preserves populated fields", () => {
    const row = {
      id: "product-1",
      title: "Chair",
      price: "79.50",
      meta_description: null,
      keywords: "furniture",
    };
    const schema = pageResultSchema(productSchema);
    const { rows } = schema.parse({ rows: [row], count: 1 });

    expect(rows[0]?.meta_description).toBeUndefined();
    expect(rows[0]?.keywords).toBe("furniture");
    expect(rows[0]?.price).toBe(79.5);
    expect(schema.safeParse({ rows: [{ ...row, keywords: 123 }] }).success).toBe(false);
  });

  it("validates paginated backend responses", () => {
    const result = pageResultSchema(productSchema).parse({
      count: 1,
      rows: [{ id: "product-1", title: "Chair", price: 80 }],
    });
    expect(result.rows).toHaveLength(1);
  });

  it("rejects malformed user and token data", () => {
    expect(() =>
      userSchema.parse({ id: "user-1", email: "invalid" }),
    ).toThrow();
    expect(() => authTokenPayloadSchema.parse({ exp: "tomorrow" })).toThrow();
  });
});
