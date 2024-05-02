// for admins

import { db } from "@/lib/db";
export const GET = async (req) => {
  try {
    const subs = await db.subscriptions.findMany({}).sort({ createdAt: 1 });

    return new Response(JSON.stringify(subs), { status: 201 });
  } catch (error) {
    return new Response("sign up faild", { status: 500 });
  }
};
