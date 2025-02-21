"use client"

import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import Header from "@/app/components/header/header";

export default function Perfil() {

    const router = useRouter()
    const [users, setUsers] :any = useState(null);
    

    useEffect(() => {

        const GetUsers = async () =>  {
            await axios.get(`http://localhost:3000/users`)
            .then(function(response){
                /* console.log(response.data, "<<<") */
                setUsers(response.data) 
            }).catch(function(error) {
                console.error("Erro ao buscar jogos:", error);
            });
        }
        GetUsers()
        
      },[]);

    
    if (users == null) 
        return ( 
            <main className={'w-screen h-screen flex flex-col items-center justify-center'}>
                <Header/>
                <p className="text-center mt-10">Carregando... {users} a </p>;
            </main>
        )

    return (
        <main className={'w-screen h-screen'}>

            <Header/>
            
            <section className="grid  grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-10 m-auto max-w-5xl w-full bg-[#671D4C] p-6 rounded-sm">

                {
                    users 
                    ?
                    
                        users.map((user:any, index:any) => {
                            return <div key={index} className="flex flex-col rounded-t-md bg-[#404040] hover:bg-[#303030] hover:scale-110 transition cursor-pointer" onClick={() => (router.push("profile/"+user.id))}>
                                <Image className="h-36 rounded-t-md " src={user.foto_de_perfil} width={1200} height={780} alt={user.name + " profile pic"}/>
                                <p className="text-center font-bold ">{user.user}</p>
                            </div>
                        })
                    
                    :
                    "a"
                }

            </section>
        </main>
    );
}
