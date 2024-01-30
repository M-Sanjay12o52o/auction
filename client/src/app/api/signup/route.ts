import { db } from "@/db/script";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { username, email, password } = body;

    const emailExists = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return new Response("Email already exists", { status: 409 });
    }

    const user = await db.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });

    return new Response(user.username);
  } catch (error) {
    console.log(error);
  }
}
