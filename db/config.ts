import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		name: column.text({ optional: true }),
		email: column.text({ optional: true }),
		emailVerified: column.date({ optional: true }),
		image: column.text({ optional: true }),
		userType: column.text({ optional: true }),
		githubId: column.text({ unique: true }),
		githubUsername: column.text(),
	},
});

const Session = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		expiresAt: column.date(),
		fresh: column.boolean(),
		userId: column.number({ references: () => User.columns.id }),
	},
});

const Course = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		title: column.text(),
		description: column.text(),
		instructorId: column.number({
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
		userId: column.number({ references: () => User.columns.id }),
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
