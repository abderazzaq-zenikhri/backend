// backend:node.js with database:mysql

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
const adminPassword = "123456";
export const POST = async (req) => {
  try {
    const {
      email,
      password,
      fullName,
      wilaya,
      city,
      address,
      phoneNumber,
      secretPassword,
    } = await req.json();
    console.log({ email, password, fullName });
    // check if user already exists

    const userProfile = await db.profile.findUnique({
      where: {
        email,
      },
    });

    if (userProfile) {
      return new Response("sign up faild, this user already exists", {
        status: 400,
      });
    }

    // create profile in db
    const isAdmin = secretPassword === adminPassword;

    await db.profile.create({
      data: {
        email,
        password,
        fullName,
        wilaya,
        city,
        address,
        phoneNumber,
        isAdmin,
      },
    });

    return new Response("sign up success", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("sign up faild", { status: 500 });
  }
};
