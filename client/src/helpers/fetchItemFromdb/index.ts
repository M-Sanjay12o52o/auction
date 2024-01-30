import { db } from "@/db/script";

export const fetchItemFromDatabase = async (id: string) => {
  const item = await db.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  return item;
};
