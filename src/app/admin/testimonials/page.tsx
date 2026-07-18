"use client";

import { useAdminData } from "@/lib/admin/AdminDataContext";
import AdminReviewsManager from "@/components/admin/AdminReviewsManager";

export default function TestimonialsPage() {
  const { reviews, handleDeleteReview } = useAdminData();
  return <AdminReviewsManager reviews={reviews} onDelete={handleDeleteReview} />;
}
