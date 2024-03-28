import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "~/server/db";
import { RESPONSE_CODE, RESPONSE_MESSAGE } from "~/constants/constants";

const TaskSchema = z.object({
    description: z.string().min(1),
    deadline: z.string(),
    user_id: z.number(),
    priority: z.string(),
});

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(TaskSchema)
    .mutation(async ({ ctx, input }) => {
      await db.task.create({
          data: {
            description: input.description,
            deadline: new Date(input.deadline),
            user_id: input.user_id,
            priority: input.priority
          },
        });
        return {
          resposneCode: RESPONSE_CODE.SUCCESS,
          responseMessage: "New Task Created Successfully",
        };
    }),
});
