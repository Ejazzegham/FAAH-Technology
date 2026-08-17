import type { Metadata } from "next";
import AuthScreen from "@/components/auth/AuthScreen";

export const metadata: Metadata = {
  title: "Sign In — FAAH Technology",
  description: "Sign in or create an account to track your orders and projects with FAAH Technology.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <AuthScreen />;
}
