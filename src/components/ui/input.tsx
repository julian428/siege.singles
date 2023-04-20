import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ClassValue } from "clsx";
import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";

const defaultClasses: ClassValue =
  "bg-main border-2 peer outline-none focus-within:border-action border-secondary rounded-lg px-4 py-1 transition-colors duration-700";
const inputVariants = cva(defaultClasses, {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label: string;
}

export default forwardRef(function StandardInput(
  { label, className, variant, ...props }: Props,
  ref?: LegacyRef<HTMLInputElement>
) {
  const uniqueId = label.replaceAll(" ", "_");

  return (
    <section className="relative">
      <input
        ref={ref}
        className={cn(inputVariants({ variant, className }))}
        id={uniqueId}
        {...props}
      />
      <label
        className="absolute left-2 bottom-2 text-sm peer-focus-within:text-action peer-focus-within:bottom-7 bg-main px-1 transition-all peer-focus-within:text-xs peer-valid:text-xs peer-valid:bottom-7"
        htmlFor={uniqueId}
      >
        {label}
      </label>
    </section>
  );
});
