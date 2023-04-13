import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function StandardLoginButton({ children }: Props) {
  return (
    <button className="bg-action text-secondary px-4 py-1 text-2xl flex items-center gap-4 rounded-lg">
      {children}
    </button>
  );
}
