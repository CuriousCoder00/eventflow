"use client";
import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { VariantProps } from "class-variance-authority";

import { cva } from "class-variance-authority";

const passwordInputVariants = cva(
  [
    "w-full flex h-9 rounded-md border border-input",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "px-3 py-1",
    "bg-transparent text-base shadow-sm dark:text-white",
    "transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground",
  ],
  {
    variants: {
      variant: {
        classic: "transition-colors duration-300 border",
        standard:
          "transition-colors duration-300 border-b-2 border-t-0 border-l-0 border-r-0",
        ghost: "border-0 transition-colors duration-300",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "classic",
        className: `border focus:border-foreground focus:shadow-sm focus:shadow-blue-400`,
      },
      {
        variant: "standard",
        className: `border-b-2 border-b-foreground rounded-none`,
      },
      {
        variant: "ghost",
        className: ``,
      },
    ],
    defaultVariants: {
      variant: "classic",
      radius: "lg",
    },
  }
);

type passwordInputProps = VariantProps<typeof passwordInputVariants> &
  ComponentProps<"input"> & {
    className?: string;
    placeholder?: string;
  };

export const PasswordInput = forwardRef<HTMLInputElement, passwordInputProps>(
  (
    { className, variant, radius, placeholder = "******", ...props },
    forwardedRef
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
      <div ref={forwardedRef} className={cn("relative w-full", className)}>
        <input
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          {...props}
          className={cn(
            "",
            className,
            passwordInputVariants({ variant, radius })
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={cn(
            "absolute inset-y-0 right-4 ",
            "text-gray-500 focus:outline-none"
          )}
        >
          {showPassword ? (
            <EyeOff className="dark:text-white" />
          ) : (
            <Eye className="dark:text-white" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";