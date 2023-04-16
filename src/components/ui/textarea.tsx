import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ClassValue } from "clsx";
import { LegacyRef, TextareaHTMLAttributes, forwardRef } from "react";

const defaultClasses: ClassValue =
  "bg-main border-2 peer outline-none w-fit resize-none focus-within:border-action border-secondary rounded-lg px-4 py-1 transition-colors duration-700";
const textareaVariants = cva(defaultClasses, {
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
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label: string;
}

export default forwardRef(function StandardTextarea(
  { label, className, variant, ...props }: Props,
  ref?: LegacyRef<HTMLTextAreaElement>
) {
  const uniqueId = label.replaceAll(" ", "_");
  return (
    <section className="relative">
      <textarea
        id={uniqueId}
        ref={ref}
        className={cn(textareaVariants({ variant, className }))}
        {...props}
      />
      <label
        htmlFor={uniqueId}
        className="absolute left-2 text-xs bg-main px-1 -top-1 peer-focus-within:text-action transition-colors"
      >
        {label}
      </label>
    </section>
  );
});
