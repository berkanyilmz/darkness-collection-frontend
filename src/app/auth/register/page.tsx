import type { Metadata } from "next";
import Register from "@/features/auth/components/Register";

export const metadata: Metadata = {
  title: "Kayıt Ol | DARKNESS COLLECTION",
  description: "Darkness Collection Atelier koleksiyoner üyeliği oluşturun.",
};

export default function RegisterPage() {
  return <Register />;
}
