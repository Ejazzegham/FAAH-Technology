"use client";

import { useEffect, useMemo, useState } from "react";
import { subscribeProjects, deleteProject, type Project } from "@/lib/projects";
import { subscribeReviews, deleteReview, type Review } from "@/lib/firestore/reviews";
import {
  subscribeMessages,
  markMessageRead,
  deleteMessage,
  type ContactMessage,
} from "@/lib/firestore/messages";
import { subscribeClients, type Client } from "@/lib/firestore/clients";
import { subscribeSubscribers, type Subscriber } from "@/lib/firestore/subscribers";
import { pctChange, startOfMonth } from "@/lib/admin/stats";

export function usePortfolioAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const unsub = subscribeProjects(setProjects);
    return () => unsub?.();
  }, []);

  async function handleDeleteProject(project: Project) {
    if (!confirm(`Delete "${project.title}"? This can't be undone.`)) return;
    try {
      await deleteProject(project);
    } catch {
      alert("Couldn't delete this project. Please try again.");
    }
  }

  return { projects, handleDeleteProject };
}

export function useReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const unsub = subscribeReviews(setReviews);
    return () => unsub?.();
  }, []);

  async function handleDeleteReview(id: string) {
    if (!confirm("Delete this review?")) return;
    try {
      await deleteReview(id);
    } catch {
      // ignore
    }
  }

  return { reviews, handleDeleteReview };
}

export function useMessagesAdmin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const unsub = subscribeMessages(setMessages);
    return () => unsub?.();
  }, []);

  return {
    messages,
    markRead: (id: string) => markMessageRead(id),
    deleteMsg: (id: string) => deleteMessage(id),
  };
}

export function useClientsAdmin() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const unsub = subscribeClients(setClients);
    return () => unsub?.();
  }, []);

  return { clients };
}

export function useSubscribersAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    const unsub = subscribeSubscribers(setSubscribers);
    return () => unsub?.();
  }, []);

  const thisMonthStart = startOfMonth(0);
  const lastMonthStart = startOfMonth(-1);
  const subsThisMonth = subscribers.filter((s) => s.createdAt >= thisMonthStart).length;
  const subsLastMonth = subscribers.filter(
    (s) => s.createdAt >= lastMonthStart && s.createdAt < thisMonthStart
  ).length;
  const changeLabel = pctChange(subsThisMonth, subsLastMonth).label;

  const monthly = useMemo(() => {
    const points: { month: string; value: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      d.setMonth(d.getMonth() - i);
      const next = new Date(d);
      next.setMonth(next.getMonth() + 1);
      const count = subscribers.filter((s) => s.createdAt >= d.getTime() && s.createdAt < next.getTime()).length;
      points.push({ month: d.toLocaleDateString("en-US", { month: "short" }), value: count });
    }
    return points;
  }, [subscribers]);

  return { subscribers, monthly, changeLabel };
}
