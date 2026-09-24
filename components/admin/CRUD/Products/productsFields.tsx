const productsFields = {
  id: { type: "id", label: "ID" },
  image: { type: "images", label: "Image" },
  title: { type: "string", label: "Title" },
  price: { type: "decimal", label: "Price" },
  discount: { type: "decimal", label: "Discount" },
  description: { type: "string", label: "Description" },
  categories: { type: "relation_many", label: "сategories" },
  more_products: { type: "relation_many", label: "More products" },
  rating: { type: "int", label: "Rating" },
  meta_description: { type: "string", label: "Meta description" },

  keywords: {
    type: "string",
    label: "Keywords (comma separated values e.g. new,cool,fancy)",
  },

  meta_author: { type: "string", label: "Meta Author" },

  meta_og_title: { type: "string", label: "Meta og title" },

  meta_og_url: { type: "string", label: "Meta og url" },

  meta_og_image: { type: "string", label: "Meta og image (link to src)" },

  meta_fb_id: { type: "string", label: "Meta facebook id" },

  meta_og_sitename: { type: "string", label: "Meta site name" },

  post_twitter: { type: "string", label: "Meta post twitter" },
  status: {
    type: "enum",
    label: "Status",

    options: [
      { value: "in stock", label: "in stock" },

      { value: "out of stock", label: "out of stock" },
    ],
  },
};

export default productsFields;
