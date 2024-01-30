import { db } from "@/db/script";
import { getAuthSession } from "../auth/[...nextauth]/options";

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
}
