"use client";

import { useAdminData } from "@/lib/admin/AdminDataContext";
import AdminMessagesManager from "@/components/admin/AdminMessagesManager";

export default function MessagesPage() {
  const { messages, handleMarkMessageRead, handleDeleteMessage } = useAdminData();
  return (
    <AdminMessagesManager
      messages={messages}
      onMarkRead={handleMarkMessageRead}
      onDelete={handleDeleteMessage}
    />
  );
}
