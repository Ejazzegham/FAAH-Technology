"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { deleteProject, subscribeProjects, type Project } from "@/lib/projects";
import {
  subscribeMessages,
  markMessageRead,
  deleteMessage,
  type ContactMessage,
} from "@/lib/firestore/messages";
import { subscribeSubscribers, type Subscriber } from "@/lib/firestore/subscribers";
import { subscribeReviews, deleteReview, type Review } from "@/lib/firestore/reviews";
import { subscribeClients, type Client } from "@/lib/firestore/clients";
import { subscribeAllOrders, type Order } from "@/lib/firestore/orders";

type AdminDataContextValue = {
  user: User | null;
  projects: Project[];
  messages: ContactMessage[];
  subscribers: Subscriber[];
  reviews: Review[];
  clients: Client[];
  orders: Order[];
  /** Project queued for editing on the Portfolio page — set from anywhere (e.g. the Dashboard's Recent Projects list), read after navigating to /admin/portfolio. */
  editingProjectId: string | null;
  setEditingProjectId: (id: string | null) => void;
  handleDeleteProject: (project: Project) => Promise<void>;
  handleDeleteReview: (id: string) => Promise<void>;
  handleMarkMessageRead: (id: string) => void;
  handleDeleteMessage: (id: string) => void;
};

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(getFirebaseAuth(), setUser), []);

  useEffect(() => {
    const unsubs = [
      subscribeProjects(setProjects),
      subscribeMessages(setMessages),
      subscribeSubscribers(setSubscribers),
      subscribeReviews(setReviews),
      subscribeClients(setClients),
      subscribeAllOrders(setOrders),
    ];
    return () => unsubs.forEach((u) => u?.());
  }, []);

  async function handleDeleteProject(project: Project) {
    if (!confirm(`Delete "${project.title}"? This can't be undone.`)) return;
    try {
      await deleteProject(project);
    } catch {
      alert("Couldn't delete this project. Please try again.");
    }
  }

  async function handleDeleteReview(id: string) {
    if (!confirm("Delete this review?")) return;
    try {
      await deleteReview(id);
    } catch {
      // ignore
    }
  }

  function handleMarkMessageRead(id: string) {
    markMessageRead(id);
  }

  function handleDeleteMessage(id: string) {
    deleteMessage(id);
  }

  return (
    <AdminDataContext.Provider
      value={{
        user,
        projects,
        messages,
        subscribers,
        reviews,
        clients,
        orders,
        editingProjectId,
        setEditingProjectId,
        handleDeleteProject,
        handleDeleteReview,
        handleMarkMessageRead,
        handleDeleteMessage,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData(): AdminDataContextValue {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}
