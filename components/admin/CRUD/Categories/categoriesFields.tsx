const categoriesFields = {
  id: { type: "id", label: "ID" },
  title: { type: "string", label: "Title" },
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
};

export default categoriesFields;
