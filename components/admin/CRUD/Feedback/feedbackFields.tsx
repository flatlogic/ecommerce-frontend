const feedbackFields = {
  id: { type: "id", label: "ID" },
  image: { type: "images", label: "Image" },
  feedback_date: { type: "datetime", label: "Order date" },
  product: { type: "relation_one", label: "Product" },
  user: { type: "relation_one", label: "User" },
  firstname: { type: "string", label: "First Name" },
  lastname: { type: "string", label: "Last Name" },
  rating: { type: "int", label: "Rating" },
  avatar: { type: "string", label: "Avatar" },
  review: { type: "string", label: "Review" },
  status: {
    type: "enum",
    label: "Status",

    options: [
      { value: "visible", label: "visible" },

      { value: "hidden", label: "hidden" },
    ],
  },
};

export default feedbackFields;
