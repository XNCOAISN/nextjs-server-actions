import { Button, ButtonProps } from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = (
  props: Omit<ButtonProps, "loading" | "variant"> &
    Omit<ComponentPropsWithoutRef<"button">, "type">
) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline" loading={pending} {...props} />
  );
};
