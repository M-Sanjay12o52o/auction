interface Post {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  baseprice: string | null;
  published: boolean;
  authorId: number;
}
