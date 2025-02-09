"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next';
import Header from "@/app/components/header";

export default function Games() {

    const router = useRouter()
    const value = getCookie('user');
    const [games, setGames] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {

        if (loading == true)
        {
            if(!games)(
                axios.get(`http://localhost:3000/games`)
                .then(function(response){
                    /* console.log(response.data, "<<<") */
                    setGames(response.data) 
                })  
            ) 
        }
        
        setLoading(false)
      });

    
    if (games == null) 
        return <main className={'w-screen h-screen flex flex-col items-center justify-center'}>
            <Header/>
            <p className="text-center mt-10">Carregando...</p>;
        </main>

    return (
        <main className={'w-screen h-screen'}>

            <Header/>
            
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 m-auto max-w-5xl w-full bg-[#671D4C] p-6 rounded-sm">

                {
                    games 
                    ?
                    
                        games.map((game, index) => {
                            return <div key={index} className="flex flex-col bg-[#404040] hover:bg-[#303030] hover:scale-110 transition cursor-pointer">
                                <Image className="h-36 w-full rounded-t-md " src={game.photo} width={1200} height={780} alt={game.name + " profile pic"}/>
                                <p className="text-center font-bold ">{game.name}</p>
                            </div>
                        })
                    
                    :
                    "a"
                }

            </section>
        </main>
    );
}
