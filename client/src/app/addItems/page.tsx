import AddItems from '@/components/AddItems'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return <div>
        <AddItems />
    </div>
}

export default page