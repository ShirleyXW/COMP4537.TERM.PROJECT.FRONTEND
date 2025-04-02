import type React from "react";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  fullScreen?: boolean;
  text?: string;
}

export default function LoadingSpinner({
  fullScreen = true,
  text = "Loading...",
  className,
  ...props
}: LoadingSpinnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center min-h-[200px]";

  return (
    <div
      className={cn(containerClasses, className)}
      role="status"
      aria-live="polite"
      {...props}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center justify-center gap-1 text-primary h-10 w-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-10 animate-scale-y"
              style={{
                animationDelay: `${i * 0.1}s`,
                backgroundColor: "currentColor",
              }}
            />
          ))}
        </div>
        {text && <p className="text-sm text-muted-foreground mt-4">{text}</p>}
      </div>
    </div>
  );
}
