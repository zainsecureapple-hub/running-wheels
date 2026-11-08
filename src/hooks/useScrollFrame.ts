"use client";

import { useEffect, useRef } from "react";

/** Runs `callback` on every animation frame while `enabled`. Never triggers a React re-render. */
export function useScrollFrame(callback: () => void, enabled = true) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return;
    let frame = requestAnimationFrame(function loop() {
      callbackRef.current();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, [enabled]);
}
