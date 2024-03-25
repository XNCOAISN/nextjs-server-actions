"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Group, Input, Paper, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Selectable } from "kysely";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { z } from "zod";

import { mergeSubmissionResult } from "~/app/utils";
import { SubmitButton } from "~/components/submit-button";
import { Message } from "~/db/types";

import { deleteMessageAction, updateMessageAction } from "./actions";
import { deleteMessageSchema, updateMessageSchema } from "./schema";

export type EditMessageFormProps = {
  message: NonNullable<Selectable<Message>>;
};

export const EditMessageForm = ({ message }: EditMessageFormProps) => {
  const [updateLastResult, updateAction] = useFormState(
    updateMessageAction,
    undefined
  );
  const [deleteLastResult, deleteAction] = useFormState(
    deleteMessageAction,
    undefined
  );

  const [form, fields] = useForm({
    lastResult: mergeSubmissionResult(updateLastResult, deleteLastResult),
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: z.union([updateMessageSchema, deleteMessageSchema]),
      });
    },
    defaultValue: {
      ...message,
    },
  });

  useEffect(() => {
    if (updateLastResult?.status === "success") {
      notifications.show({ message: "Message updated" });
    }
    if (deleteLastResult?.status === "success") {
      notifications.show({ message: "Message deleted" });
    }
  }, [updateLastResult, deleteLastResult]);

  return (
    <form {...getFormProps(form)} noValidate>
      <Input {...getInputProps(fields.id, { type: "hidden" })} />
      <Paper withBorder px="xl" py="lg">
        <Group gap={4} justify="space-between">
          <Input
            {...getInputProps(fields.message, { type: "text" })}
            variant="filled"
          />
          <Group>
            <SubmitButton formAction={updateAction}>Update</SubmitButton>
            <SubmitButton formAction={deleteAction}>Delete</SubmitButton>
          </Group>
        </Group>
        <Text c="red" size="xs">
          {form.errors}
        </Text>
      </Paper>
    </form>
  );
};
