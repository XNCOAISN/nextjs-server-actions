"use client";

import { parseWithZod } from "@conform-to/zod";
import { getFormProps, getTextareaProps, useForm } from "@conform-to/react";
import { Group, Stack, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { SubmitButton } from "~/components/submit-button";

import { createMessageAction } from "./actions";
import { createMessageSchema } from "./schema";

export const CreateMessageForm = () => {
  const [lastResult, action] = useFormState(createMessageAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: createMessageSchema });
    },
    defaultValue: {
      message: "",
    },
  });

  useEffect(() => {
    if (lastResult?.status === "success") {
      form.reset();
      notifications.show({ message: "Message created" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastResult]);

  return (
    <form {...getFormProps(form)} action={action} noValidate>
      <Stack gap="xs">
        <Textarea
          {...getTextareaProps(fields.message)}
          key={fields.message.key}
          label="Message"
          error={fields.message.errors}
        />
        <Group justify="flex-end">
          <SubmitButton>Send</SubmitButton>
        </Group>
      </Stack>
    </form>
  );
};
