"use client";

import { useAdminData } from "@/lib/admin/AdminDataContext";
import AdminClientsCard from "@/components/admin/AdminClientsCard";

export default function ClientsPage() {
  const { clients } = useAdminData();
  return <AdminClientsCard clients={clients} />;
}
