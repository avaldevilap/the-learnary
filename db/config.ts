import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ optional: true }),
    email: column.text({ optional: true }),
    emailVerified: column.date({ optional: true }),
    image: column.text({ optional: true }),
    userType: column.text({ optional: true }),
    githubId: column.number({ name: "github_id", unique: true }),
    githubUsername: column.text({ name: "github_username" }),
    githubAvatar: column.text({ name: "github_avatar", optional: true }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expires_at: column.date({ default: new Date() }),
    fresh: column.boolean({ default: true }),
    user_id: column.text({
      references: () => User.columns.id,
    }),
  },
});

const Course = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    instructorId: column.text({
      references: () => User.columns.id,
      optional: true,
    }),
    // (e.g., programming, design, marketing)
    category: column.text(),
    // (e.g., beginner, intermediate, advanced)
    difficultyLevel: column.text({ default: "beginner" }),
    createdAt: column.date({ default: new Date() }),
  },
});

const Content = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    courseId: column.number({ references: () => Course.columns.id }),
    // (e.g., video, text, quiz)
    contentType: column.text(),
    title: column.text(),
    // (text content, video URL, etc.)
    data: column.text(),
    // (sequence within the course)
    order: column.number(),
  },
});

const Enrollment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    courseId: column.number({ references: () => Course.columns.id }),
    enrollmentDate: column.date(),
    // (percentage completed, optional)
    progress: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { User, Session, Course, Content, Enrollment },
});
