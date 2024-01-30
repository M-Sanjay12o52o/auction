import ItemPage from '@/components/ItemPage';
import { db } from '@/db/script';
import { FC } from 'react'

interface pageProps {
    params: {
        roomId: string;
    };
}

const page: FC<pageProps> = async ({ params }) => {
    const item = await db.post.findFirst({
        where: {
            id: Number(params.roomId)
        }
    })

    return <div>
        {/* Details about the room {params.roomId} */}
        <ItemPage item={item} />
    </div>
}

export default page