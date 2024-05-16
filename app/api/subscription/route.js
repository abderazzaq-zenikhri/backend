// for admins

import { db } from "@/lib/db";
export const GET = async (req) => {
  try {
    const subs = await db.subscriptions.findMany({
      include: {
        profile: true,
      },
      orderBy: {
        createdAt: "asc", // Sorting by createdAt field in ascending order
      },
    });

    return new Response(JSON.stringify(subs), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("sign up faild", { status: 500 });
  }
};
/* */
