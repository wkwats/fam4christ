import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// CREATE A USER
export const POST = async (req) => {
  try {
    const body = await req.json();

    const { name, email, password, passwordRepeat } = body.formData;

    if (password !== passwordRepeat) {
      return new NextResponse(
        JSON.stringify({ message: "Passwords do not match" }, { status: 400 })
      );
    }

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "All fields are required" }, { status: 401 })
      );
    }
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return new NextResponse(
        JSON.stringify(
          { message: "User with this email already exists" },
          { status: 409 }
        )
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      image: "",
      role: "cred-user",
    };

    await prisma.user.create({ data: { ...newUser } });

    // return new NextResponse(
    //   JSON.stringify({ message: "User Created!" }, { status: 200 })
    // );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// export const register = async (previousState, formData) => {
//   const { fullname, username, email, password, img, passwordRepeat } =
//     Object.fromEntries(formData);

//   if (password !== passwordRepeat) {
//     return { error: "Passwords do not match" };
//   }

//   try {
//     const user = await prisma.user.findUnique({ email });

//     if (user) {
//       return { error: "Username already exists" };
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       fullname,
//       username,
//       email,
//       password: hashedPassword,
//       img,
//     });

//     await newUser.save();
//     console.log("saved to db");

//     return { success: true };
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };
