import * as React from "react"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'> & { 
    value?: number | readonly number[];
    defaultValue?: number | readonly number[];
    onValueChange?: (value: number | readonly number[]) => void;
  }
>(({ className, min = 0, max = 100, step = 1, value, defaultValue, onValueChange, ...props }, ref) => {
  // Handle array values for compatibility with previous interface
  const numValue = Array.isArray(value) ? value[0] : (value || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange([Number(e.target.value)]);
    }
  };

  return (
    <div className={cn("relative flex w-full touch-none items-center", className)}>
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={numValue}
        onChange={handleChange}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        {...props}
      />
    </div>
  )
})
Slider.displayName = "Slider"

export { Slider }
