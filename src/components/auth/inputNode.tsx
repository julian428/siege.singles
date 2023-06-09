import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

export default forwardRef(function InputNode(
  { ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<any>
) {
  return (
    <input
      {...props}
      ref={ref}
      className="bg-transparent border-2 focus:border-action transition-colors duration-500 border-secondary rounded-lg outline-none md:w-[7vw] w-[12vw] md:h-[20vh] h-[8vh] text-5xl md:text-9xl text-center"
      type="text"
      maxLength={1}
      required
      autoComplete="off"
    />
  );
});
