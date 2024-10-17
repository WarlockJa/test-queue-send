"use server";
import { actionClient } from "@/lib/safeAction";
import { q } from "@cf/queue/q";
import { z } from "zod";

const sendQueueMessageSchema = z.object({
  message: z.string().min(1),
});

export const sendQueueMessage = actionClient
  .schema(sendQueueMessageSchema)
  .action(async ({ parsedInput }) => {
    await q.send(parsedInput.message);
  });
