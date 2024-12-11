import React from "react";
import Login from "@/components/auth/login";
import { auth } from "@/auth";

const LoginPage = async () => {
  const session = await auth();
  console.log('>> check seesion', session);
  return <Login />;
};

export default LoginPage;
