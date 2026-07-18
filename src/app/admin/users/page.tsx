"use client";

import { useAdminData } from "@/lib/admin/AdminDataContext";
import AdminAccountCard from "@/components/admin/AdminAccountCard";

export default function UsersPage() {
  const { user } = useAdminData();
  return <AdminAccountCard user={user} />;
}
