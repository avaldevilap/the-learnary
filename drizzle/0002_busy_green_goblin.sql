DO $$ BEGIN
 CREATE TYPE "userType" AS ENUM('student', 'instructor', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "userType" "userType";