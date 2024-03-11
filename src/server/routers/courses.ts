import { db } from "@/db";
import { publicProcedure, router } from "@/server/trpc";
import { course } from "@/schema";
import { z } from "zod";

export const courseRouter = router({
  list: publicProcedure.query(async () => {
    const courses = await db.query.course.findMany();
    return courses;
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db
        .insert(course)
        .values({ ...input })
        .returning();
    }),
});
