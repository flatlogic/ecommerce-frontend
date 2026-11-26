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
