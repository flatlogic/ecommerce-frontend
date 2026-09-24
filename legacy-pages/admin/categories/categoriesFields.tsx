export const categoriesFields = {
  id: { type: "id", label: "ID" },
  title: { type: "string", label: "Title" },
};

const Component = () => {
  return null;
};

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Component;
