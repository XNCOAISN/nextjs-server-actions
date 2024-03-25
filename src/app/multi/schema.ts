import { z } from "zod";

export const createMessageSchema = z.object({
  message: z.string().min(1).max(280),
});

export const updateMessageSchema = z.object({
  id: z.number(),
  message: z.string().min(1).max(280),
});

export const deleteMessageSchema = z.object({
  id: z.number(),
});
