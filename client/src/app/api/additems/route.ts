import { db } from "@/db/script";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuthSession } from "../auth/[...nextauth]/options";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, image, description, baseprice } = body;

    const post = await db.post.create({
      data: {
        title: title,
        image: image,
        description: description,
        baseprice: baseprice,
        authorId: 1,
      },
    });

    return new Response(post.title);
  } catch (error) {
    console.log(error);
  }
}
