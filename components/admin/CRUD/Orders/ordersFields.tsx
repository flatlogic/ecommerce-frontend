const ordersFields = {
  id: { type: "id", label: "ID" },
  order_date: { type: "datetime", label: "Order date" },
  product: { type: "relation_one", label: "Product" },
  user: { type: "relation_one", label: "User" },
  amount: { type: "int", label: "Amount" },
  status: {
    type: "enum",
    label: "Status",

    options: [
      { value: "in cart", label: "in cart" },

      { value: "bought", label: "bought" },
    ],
  },
};

export default ordersFields;
