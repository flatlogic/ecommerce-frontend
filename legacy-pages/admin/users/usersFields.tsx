export const usersFields = {
  id: { type: "id", label: "ID" },
  wishlist: { type: "relation_many", label: "Wishlist" },
  firstName: { type: "string", label: "First Name" },
  lastName: { type: "string", label: "Last Name" },
  phoneNumber: { type: "string", label: "Phone Number" },
  email: { type: "string", label: "E-mail" },
  role: {
    type: "enum",
    label: "Role",

    options: [
      { value: "admin", label: "admin" },

      { value: "user", label: "user" },
    ],
  },
  disabled: { type: "boolean", label: "Disabled" },
  avatar: { type: "images", label: "Avatar" },
  password: { type: "string", label: "Password" },
  emailVerified: { type: "boolean", label: "emailVerified" },
  emailVerificationToken: { type: "string", label: "emailVerificationToken" },
  emailVerificationTokenExpiresAt: {
    type: "datetime",
    label: "emailVerificationTokenExpiresAt",
  },
  passwordResetToken: { type: "string", label: "passwordResetToken" },
  passwordResetTokenExpiresAt: {
    type: "datetime",
    label: "passwordResetTokenExpiresAt",
  },
  provider: { type: "string", label: "provider" },
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
