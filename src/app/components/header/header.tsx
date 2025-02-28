"use client"

import Link from "next/link";
import Image from "next/image";
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';


export default function Header() {

    const router = useRouter();
    const cookieValue = getCookie('user');

    if (cookieValue == ''){
        router.push('/sign-in');
    }

    const value = cookieValue ? (typeof cookieValue === "string" ? JSON.parse(cookieValue) : cookieValue) : null;

    if (cookieValue ==  null)
    {
        return 
        (
            <div>
                <p>its over ...</p>
            </div>
        )
    }

    function Exit () {
        setCookie('user', '');
        router.push('/sign-in');
    }

    return (
        <header className="h-16 flex p-2 bg-[#171a21] mb-6 relative">
            

            <ul className=" absolute w-full self-center justify-center flex items-center gap-3">
                <li className="hover:text-pink-300">
                    <Link className="" href="/profile">
                        <p className="text-center">Perfis</p>
                    </Link>
                </li>
                <li className="hover:text-pink-300">
                    <Link className="" href="/games">
                        <p className="text-center">Games</p>
                    </Link>
                </li>
            </ul>
            <div className="flex gap-5 ml-auto z-50 ">
                <Link className="sm:flex items-center gap-2 ml-auto self-center hidden" rel="stylesheet" href={"/profile/" + value.id} >
                    <Image  className="max-h-10 max-w-10 rounded-full" src={value.foto_de_perfil} alt="user image" width={1200} height={780} />
                    <p className="font-bold">{value.user}</p>
                </Link>
                <p onClick={Exit} className="self-center hover:text-red-500 cursor-pointer">Exit</p>
            </div>
        </header>
    );
}
