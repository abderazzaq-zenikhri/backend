// for clients

import { db } from "@/lib/db";
export const GET = async (req, { params }) => {
  try {
    const { email } = params;
    const sub = await db.subscriptions.findFirst({
      where: {
        profile: {
          email,
        },
      },
    });

    return new Response(JSON.stringify(sub), { status: 201 });
  } catch (error) {
    return new Response("sign up faild", { status: 500 });
  }
};
