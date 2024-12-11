"use client";
import { SessionProvider } from "next-auth/react";

// provide session with user info for entire project
export default function NextAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
