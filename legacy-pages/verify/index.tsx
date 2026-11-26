import { useEffect } from "react";
import { verifyEmail } from "@/redux/actions/auth";
import { store } from "@/redux/store";

export default function VerifyEmail() {
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) store.dispatch(verifyEmail(token));
  }, []);

  return null;
}

export async function getServerSideProps(_context: unknown) {
  return { props: {} };
}
