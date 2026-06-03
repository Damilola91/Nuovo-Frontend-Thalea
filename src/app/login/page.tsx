import type { Metadata } from "next";
import { LoginForm } from "@/components/Login/LoginForm";

export const metadata: Metadata = {
  title: "Login | Thălēa Palermo Apartment",
  description: "Accedi al tuo account Thălēa.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-24">
      <LoginForm />
    </div>
  );
}