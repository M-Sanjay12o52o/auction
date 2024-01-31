import { db } from "@/db/script";
import { getAuthSession } from "../auth/[...nextauth]/options";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, image, description, baseprice, status } = body;

    const post = await db.item.create({
      data: {
        title: title,
        image: image,
        description: description,
        baseprice: baseprice,
        authorId: 1,
        status: status,
      },
    });

    return new Response(post.title);
  } catch (error) {
    console.log(error);
  }
}
