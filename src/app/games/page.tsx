"use client"

import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/app/components/header/header";

export default function Games() {

    const [games, setGames]= useState<any>(null);

    useEffect(() => {

        async function GetGames() {
            axios.get(`http://localhost:3000/games`).then(function(response)
            {
                setGames(response.data) 
            }).catch(function(error) {
                console.error("Erro ao buscar jogos:", error);
                setGames(null)
            });
        }
        GetGames()
      }, []);

    
    if (games == null)  
        return ( 
            <main className={'w-screen h-screen flex flex-col items-center justify-center'}>
                <Header/>
                <p className="text-center mt-10">It is carregando...</p>;
            </main>
        )
    if (games.length == 0)  
        return ( 
            <main className={'w-screen h-screen flex flex-col items-center justify-center'}>
                <Header/>
                <p className="text-center mt-10">It is carregando...</p>;
            </main>
        )

    return (
        <div className={'w-screen h-screen'}>

            <Header/>
            
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 m-auto max-w-5xl w-full bg-[#671D4C] p-6 rounded-sm">

                {
                    games 
                    ?
                    
                        games.map((game: any, index: any) => {
                            return <div key={index} className="flex flex-col bg-[#404040] hover:bg-[#303030] hover:scale-110 transition">
                                <Image className="h-36 w-full rounded-t-md " src={game.photo} width={1200} height={780} alt={game.name + " profile pic"}/>
                                <p className="text-center font-bold ">{game.name}</p>
                            </div>
                        })
                    
                    :
                    "a"
                }

            </section>
        </div>
    );
}
