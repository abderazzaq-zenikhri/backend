// backend:node.js with database:mysql

import { db } from "@/lib/db";
export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    console.log({ id });
    await db.subscriptions.delete({
      where: {
        id: +id,
      },
    });

    return new Response("delete success", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("delete faild", { status: 500 });
  }
};
