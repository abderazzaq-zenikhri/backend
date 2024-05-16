import { db } from "@/lib/db";

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    console.log({ email, password });
    const userProfile = await db.profile.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!userProfile) {
      return new Response("sign in faild, email or password are incorrect ", {
        status: 400,
      });
    }

    return new Response(JSON.stringify(userProfile), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("sign in faild", { status: 500 });
  }
};
