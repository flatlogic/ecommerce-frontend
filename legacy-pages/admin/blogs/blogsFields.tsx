export const blogsFields = {
  id: { type: "id", label: "ID" },
  image: { type: "images", label: "Image" },
  title: { type: "string", label: "Title" },
  price: { type: "decimal", label: "Price" },
  discount: { type: "decimal", label: "Discount" },
  description: { type: "string", label: "Description" },
  categories: { type: "relation_many", label: "сategories" },
  more_blogs: { type: "relation_many", label: "More blogs" },
  rating: { type: "int", label: "Rating" },
  status: {
    type: "enum",
    label: "Status",

    options: [
      { value: "in stock", label: "in stock" },

      { value: "out of stock", label: "out of stock" },
    ],
  },
};

const Component = () => {
  return null;
};

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/blogs");
  // const blogs = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Component;
