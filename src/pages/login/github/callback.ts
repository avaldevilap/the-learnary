import { User, db, eq } from "astro:db";
import { github, lucia } from "@/auth";
import { OAuth2RequestError } from "arctic";

import type { APIContext } from "astro";

type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
};

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storedState = context.cookies.get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();
    console.log(githubUser);

    // Replace this with your own DB client.
    const existingUser = await db
      .select()
      .from(User)
      .where(eq(User.githubId, githubUser.id))
      .get();

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return context.redirect("/");
    }

    // Replace this with your own DB client.
    const user = await db
      .insert(User)
      .values({
        githubId: githubUser.id,
        githubUsername: githubUser.login,
        githubAvatar: githubUser.avatar_url,
      })
      .returning()
      .get();

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return context.redirect("/");
  } catch (e) {
    console.log(e);
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
