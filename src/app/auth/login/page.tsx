import type { Metadata } from "next";
import Login from "@/features/auth/components/Login";

export const metadata: Metadata = {
  title: "Giriş Yap | DARKNESS COLLECTION",
  description: "Darkness Collection Atelier üye girişi.",
};

export default function LoginPage() {
  return <Login />;
}
