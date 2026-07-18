"use client";

import { useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";

type Align = "left" | "right";

type Options = {
  align?: Align;
  width?: number;
  estimatedHeight?: number;
  gap?: number;
};

/**
 * Computes fixed-position CSS for a popover that's rendered through a portal
 * (into document.body) and anchored to a trigger element. Because it uses
 * `position: fixed` with coordinates from the trigger's real screen
 * position — rather than `position: absolute` nested inside the trigger —
 * it's never clipped by a parent's `overflow: hidden` (e.g. a rounded CTA
 * card) and never fights a parent's stacking context (e.g. inside the
 * mobile nav drawer). It also flips to open upward, and clamps
 * horizontally, whenever there isn't enough room.
 */
export function usePopoverPosition(
  triggerRef: RefObject<HTMLElement | null>,
  open: boolean,
  { align = "right", width = 240, estimatedHeight = 168, gap = 8 }: Options = {}
) {
  const [style, setStyle] = useState<CSSProperties>({ visibility: "hidden" });

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    function update() {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = spaceBelow < estimatedHeight + gap && rect.top > spaceBelow;

      let left = align === "right" ? rect.right - width : rect.left;
      left = Math.min(Math.max(left, 8), window.innerWidth - width - 8);

      setStyle({
        position: "fixed",
        left,
        width,
        top: openUpward ? undefined : rect.bottom + gap,
        bottom: openUpward ? window.innerHeight - rect.top + gap : undefined,
        visibility: "visible",
      });
    }

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, align, width, estimatedHeight, gap, triggerRef]);

  return style;
}
