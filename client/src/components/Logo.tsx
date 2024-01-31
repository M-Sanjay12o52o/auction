import Image from 'next/image';
import { FC } from 'react';

interface LogoProps { }

const Logo: FC<LogoProps> = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
                <Image className='bg-slate-500' src="/gavel.svg" alt="Gavel Logo" layout="fill" />
            </div>
            <p className="text-lg font-semibold hover:text-gray-600 transition-colors duration-300">
                BidMasters
            </p>
        </div>
    );
};

export default Logo;
