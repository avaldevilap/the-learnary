CREATE TABLE IF NOT EXISTS "content" (
	"id" integer PRIMARY KEY NOT NULL,
	"courseId" integer,
	"contentType" text,
	"title" text,
	"data" text,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"instructorId" text,
	"category" text,
	"difficultyLevel" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrollment" (
	"id" integer PRIMARY KEY NOT NULL,
	"userId" text,
	"courseId" integer,
	"date" date,
	"progress" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "content" ADD CONSTRAINT "content_courseId_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_instructorId_user_id_fk" FOREIGN KEY ("instructorId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_courseId_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
