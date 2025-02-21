"use client"

import Link from "next/link";
import Image from "next/image";
import { getCookie } from 'cookies-next';

export default function Header() {

    const cookieValue = getCookie('user');
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

    return (
        <header className="h-16 flex p-2 bg-[#171a21] mb-6">

            <ul className="flex flex-1 gap-3 justify-center items-center">
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
            
            <Link className="flex items-center gap-2 ml-auto self-center" rel="stylesheet" href={"/profile/" + value.id} >
                <Image  className="max-h-10 max-w-10 rounded-full" src={value.foto_de_perfil} alt="user image" width={1200} height={780} />
                <p className="font-bold">{value.user}</p>
            </Link>
        </header>
    );
}
