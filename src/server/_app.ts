import { courseRouter } from "@/server/routers/courses";
import { router } from "@/server/trpc";

export const appRouter = router({
  course: courseRouter,
});

export type AppRouter = typeof appRouter;
