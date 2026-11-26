"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "@/redux/store";
import { doInit } from "@/redux/actions/auth";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";
axios.defaults.headers.common["Content-Type"] = "application/json";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    store.dispatch(doInit());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
