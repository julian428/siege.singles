import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ClassValue } from "clsx";
import { ButtonHTMLAttributes } from "react";

//* button variants
const defaultClasses: ClassValue =
  "border-2 border-secondary text-secondary hover:border-action transition-colors duration-700 px-8 py-2 text-2xl flex flex-shrink-0 items-center justify-center gap-4 w-fit rounded-lg";
const buttonVariants = cva(defaultClasses, {
  variants: {
    variant: {
      action: "disabled:hover:border-secondary",
      secondary: "border-main text-main disabled:hover:border-main",
    },
  },
  defaultVariants: {
    variant: "action",
  },
});

//* page logics
interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function StandardButton({
  children,
  className,
  variant,
  ...props
}: Props) {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </button>
  );
}
