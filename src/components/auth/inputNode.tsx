import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

export default forwardRef(function InputNode(
  { ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<any>
) {
  return (
    <input
      {...props}
      ref={ref}
      className="bg-transparent border-2 focus:border-action transition-colors duration-500 border-secondary rounded-lg outline-none w-[7vw] h-[20vh] text-9xl text-center"
      type="text"
      maxLength={1}
      required
      autoComplete="off"
    />
  );
});
