"use client";

import { useState, useEffect } from "react";

type LoadingSpinnerProps = {
  fullScreen?: boolean;
  text?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "white";
};

export default function LoadingSpinner({
  fullScreen = false,
  text = "Loading...",
  size = "md",
  color = "primary",
}: LoadingSpinnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    white: "text-white",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    </div>
  );
}
