"use client";

import { parseWithZod } from "@conform-to/zod";
import { getFormProps, getTextareaProps, useForm } from "@conform-to/react";
import { Group, Stack, Textarea } from "@mantine/core";
import { useFormState } from "react-dom";

import { SubmitButton } from "~/components/submit-button";

import { createMessageAction } from "../actions";
import { createMessageSchema } from "../schema";

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

  return (
    <form {...getFormProps(form)} action={action} noValidate>
      <Stack gap="xs">
        <Textarea
          {...getTextareaProps(fields.message)}
          key={fields.message.key}
          error={fields.message.errors}
        />
        <Group justify="flex-end">
          <SubmitButton>Send</SubmitButton>
        </Group>
      </Stack>
    </form>
  );
};
