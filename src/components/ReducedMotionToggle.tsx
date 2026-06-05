import React from "react";
import { Sparkles, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotionPref } from "@/hooks/use-reduced-motion-pref";

interface Props {
  className?: string;
}

const ReducedMotionToggle: React.FC<Props> = ({ className }) => {
  const { reduced, toggle } = useReducedMotionPref();
  const label = reduced ? "Enable animations" : "Reduce motion and animations";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={label}
      aria-pressed={reduced}
      title={label}
      className={`focus-visible:ring-2 focus-visible:ring-media-purple ${className ?? ""}`}
    >
      {reduced ? (
        <MinusCircle className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
};

export default ReducedMotionToggle;
