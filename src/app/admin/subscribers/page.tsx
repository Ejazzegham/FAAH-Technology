"use client";

import { useAdminData } from "@/lib/admin/AdminDataContext";
import AdminSubscribersList from "@/components/admin/AdminSubscribersList";

export default function SubscribersPage() {
  const { subscribers } = useAdminData();
  return <AdminSubscribersList subscribers={subscribers} />;
}
