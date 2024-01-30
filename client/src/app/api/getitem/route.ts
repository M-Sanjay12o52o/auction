import { db } from "@/db/script";
import { getAuthSession } from "../auth/[...nextauth]/options";

export async function GET(req: Request) {
  const session = await getAuthSession();

  const id = req.body;

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const item = await db.post.findFirst({
    where: {
      id: id,
    },
  });

  return new Response(JSON.stringify(item));
}
