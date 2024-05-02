// backend:node.js with database:mysql

import { db } from "@/lib/db";
export const POST = async (req) => {
  try {
    const { plane, email } = await req.json();
    // get client profile
    const profile = await db.profile.findUnique({
      where: { email },
    });
    if (!profile) {
      return new Response("profile not exist", { status: 400 });
    }

    const existSub = await db.subscriptions.findFirst({
      where: {
        profileId: profile.id,
      },
    });

    if (existSub) {
      await db.subscriptions.deleteMany({
        where: {
          profileId: profile.id,
        },
      });
    }

    const sub = await db.subscriptions.create({
      data: {
        plane,
        profileId: profile.id,
      },
    });

    return new Response(JSON.stringify(sub), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("delete faild", { status: 500 });
  }
};
