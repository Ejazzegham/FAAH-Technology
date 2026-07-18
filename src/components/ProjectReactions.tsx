"use client";

import { useEffect, useState } from "react";
import { Heart, Bookmark } from "lucide-react";
import {
  getVisitorId,
  getVisitorReactions,
  subscribeProjectReactionCounts,
  toggleReaction,
} from "@/lib/firestore/reactions";

type Props = {
  projectId: string;
  initialLikes?: number;
  initialFavorites?: number;
  /** "sm" = compact pill for grid cards, "lg" = full-size buttons for the detail page. */
  size?: "sm" | "lg";
  className?: string;
};

export default function ProjectReactions({
  projectId,
  initialLikes = 0,
  initialFavorites = 0,
  size = "sm",
  className = "",
}: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [favorites, setFavorites] = useState(initialFavorites);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [busy, setBusy] = useState<"like" | "favorite" | null>(null);

  // Live shared counts, so a like from any visitor updates everyone's view.
  useEffect(() => {
    const unsub = subscribeProjectReactionCounts(projectId, (counts) => {
      setLikes(counts.likes);
      setFavorites(counts.favorites);
    });
    return () => unsub?.();
  }, [projectId]);

  // This visitor's own toggle state, so their heart/bookmark shows as
  // already active if they come back to the same project.
  useEffect(() => {
    let cancelled = false;
    const visitorId = getVisitorId();
    if (!visitorId) return;
    getVisitorReactions(projectId, visitorId).then((state) => {
      if (cancelled) return;
      setLiked(state.liked);
      setFavorited(state.favorited);
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  async function handleToggle(
    e: React.MouseEvent,
    kind: "like" | "favorite"
  ) {
    // Cards wrap these buttons in a <Link> to the project page — reacting
    // shouldn't also navigate.
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;

    const visitorId = getVisitorId();
    const isLiking = kind === "like";
    const wasActive = isLiking ? liked : favorited;
    const nextActive = !wasActive;

    // Optimistic update — feels instant, corrected by the live subscription
    // if the write ends up failing.
    if (isLiking) {
      setLiked(nextActive);
      setLikes((n) => n + (nextActive ? 1 : -1));
    } else {
      setFavorited(nextActive);
      setFavorites((n) => n + (nextActive ? 1 : -1));
    }

    setBusy(kind);
    try {
      await toggleReaction(projectId, visitorId, kind);
    } catch {
      // Roll back on failure (e.g. offline).
      if (isLiking) {
        setLiked(wasActive);
        setLikes((n) => n + (wasActive ? 1 : -1));
      } else {
        setFavorited(wasActive);
        setFavorites((n) => n + (wasActive ? 1 : -1));
      }
    } finally {
      setBusy(null);
    }
  }

  const isSm = size === "sm";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={(e) => handleToggle(e, "like")}
        aria-pressed={liked}
        aria-label={liked ? "Unlike this project" : "Like this project"}
        className={`flex items-center gap-1.5 rounded-full border transition-colors ${
          isSm ? "px-2.5 py-1 text-xs" : "px-4 py-2 text-sm"
        } ${
          liked
            ? "border-gold/60 bg-gold/10 text-gold"
            : "border-line text-muted hover:border-gold/50 hover:text-gold"
        }`}
      >
        <Heart
          className={isSm ? "h-3.5 w-3.5" : "h-4 w-4"}
          fill={liked ? "currentColor" : "none"}
        />
        <span className="font-semibold">{likes}</span>
      </button>

      <button
        type="button"
        onClick={(e) => handleToggle(e, "favorite")}
        aria-pressed={favorited}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        className={`flex items-center gap-1.5 rounded-full border transition-colors ${
          isSm ? "px-2.5 py-1 text-xs" : "px-4 py-2 text-sm"
        } ${
          favorited
            ? "border-gold/60 bg-gold/10 text-gold"
            : "border-line text-muted hover:border-gold/50 hover:text-gold"
        }`}
      >
        <Bookmark
          className={isSm ? "h-3.5 w-3.5" : "h-4 w-4"}
          fill={favorited ? "currentColor" : "none"}
        />
        <span className="font-semibold">{favorites}</span>
      </button>
    </div>
  );
}
