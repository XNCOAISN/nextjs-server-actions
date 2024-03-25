"use server";

import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";

import { sleep } from "~/app/utils";
import { kysely } from "~/db/kysely";

import {
  createMessageSchema,
  deleteMessageSchema,
  updateMessageSchema,
} from "./schema";
import { redirect } from "next/navigation";

export const createMessageAction = async (
  previousState: unknown,
  formData: FormData
) => {
  const submission = parseWithZod(formData, {
    schema: createMessageSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { message } = submission.value;

  await sleep(1000);
  await kysely.insertInto("messages").values({ message }).execute();

  revalidatePath("/single");
  revalidatePath("/multi");
  redirect("/multi?message=Message%20created");
};

export const updateMessageAction = async (
  previousState: unknown,
  formData: FormData
) => {
  const submission = parseWithZod(formData, {
    schema: updateMessageSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { id, message } = submission.value;

  await sleep(1000);
  await kysely
    .updateTable("messages")
    .set({ message })
    .where("id", "=", id)
    .executeTakeFirstOrThrow();

  revalidatePath("/single");
  revalidatePath("/multi");
  revalidatePath(`/multi/${id}`);
  redirect(`/multi/${id}?message=Message%20updated`);
};

export const deleteMessageAction = async (
  previousState: unknown,
  formData: FormData
) => {
  const submission = parseWithZod(formData, {
    schema: deleteMessageSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { id } = submission.value;

  await sleep(1000);
  await kysely
    .deleteFrom("messages")
    .where("id", "=", id)
    .executeTakeFirstOrThrow();

  revalidatePath("/single");
  revalidatePath("/multi");
  redirect("/multi?message=Message%20deleted");
};
