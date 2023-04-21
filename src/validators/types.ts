import { z } from "zod";

export const isNumber = (value: any) => {
  const check = z.number();
  return check.parse(value);
};

export const isString = z.string();
