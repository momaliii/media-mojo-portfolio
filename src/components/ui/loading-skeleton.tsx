
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  type: "card" | "text" | "image" | "profile";
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ 
  type, 
  count = 1, 
  className = "" 
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className={`rounded-xl overflow-hidden ${className}`}>
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-8 w-1/3 mt-2" />
            </div>
          </div>
        );
      case "text":
        return (
          <div className={`space-y-2 ${className}`}>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        );
      case "image":
        return <Skeleton className={`w-full ${className}`} />;
      case "profile":
        return (
          <div className={`flex items-center space-x-4 ${className}`}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        );
      default:
        return <Skeleton className={`w-full h-8 ${className}`} />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}
