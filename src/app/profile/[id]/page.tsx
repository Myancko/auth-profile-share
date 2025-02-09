"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from 'cookies-next';
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function Perfil({params}) {

    const value = getCookie('user');

    const { id } = React.use(params);
    const [userCoockie, setUserCoockie] = useState(null);
    const [user, setUser] = useState(null);
    const [userSections, setUserSections] = useState([]);
    const [allGames, setGames] = useState([]);
    const getRandomInt = () => 1;
    const imageCount = 3;
    const [loading, setLoading] = useState(true);

    console.log(value, '<<<<')

    const cookie = async () => {
        const co = await getCookie('user');
        JSON.parse(co)
        setUserCoockie(co);
    } 

    useEffect(() => {

        if (loading == true)
        {
            if (!id) return;
            if(!user){
                cookie()
                axios.get(`http://localhost:3000/users/${id}`)
                .then(function(response){
                    /* console.log(response.data, "<<<") */
                    setUser(response.data) 
                })  
            }
        
            if (userSections.length === 0) {
                axios.get("http://localhost:3000/displays")
                    .then(function(response) {
                        let data = [];
                        response.data.forEach(item => {
                            if (item.owner === id) {
                                data.push(item);
                            }
                        });
                        setUserSections(data); 
                    })
                    .catch(error => {
                        console.error("Error fetching displays:", error);
                    });
            }
            
        
            if (allGames.length === 0) {
                axios.get("http://localhost:3000/games")
                    .then(function(response) {
                        console.log(response.data, "<<<");
                        setGames(response.data);
                    })
                    .catch(error => {
                        console.error("Error fetching games:", error);
                    });
            }
            console.log(allGames, "<<<<<<<");
        }
        
        setLoading(false)
      });

      

    if (user == null) 
        return <p className="text-center mt-10">Carregando...</p>;

    return (
        <main className={'w-screen h-screen'}>

            <Header/>
            
            <section className="flex flex-col gap-10 m-auto max-w-5xl w-full bg-[#671D4C] p-6">

                <div className="flex justify-between gap-5">
                    <div className="flex gap-3">
                        <Image className="max-w-44 h-48 rounded cursor-pointer-md" src={user.foto_de_perfil} alt="..." width={175} height={175} />
                        <div className="flex flex-col justify-evenly max-w-xl">
                            <h2 className="font-bold">{user.user}</h2>
                            <p>{user.description ? user.description : "Does not posses description he is muito gay"}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-evenly max-w-40">
                        <p>Insignias</p>
                        <div className="flex flex-wrap gap-2 w-full">
                            {new Array(imageCount).fill(null).map((_, index) => (
                                <img
                                    key={index}
                                    className="max-w-12 max-h-12 rounded-full "
                                    src={`https://placewaifu.com/image/${getRandomInt()}`} // Different random int for each image
                                    alt={`Image description ${index + 1}`}
                                    width={50}
                                    height={50}
                                />
                            ))}
                        </div>
                        {
                            JSON.parse(userCoockie).id == id 
                            ?
                            <div className="w-full text-center"><Link href={"/config/"+id}><p>Configurações</p></Link></div>
                            :
                            ""
                        }
                        
                        
                    </div>
                </div>

                {/* <div className="bg-black h-0.5 w-full opacity-10"></div> */}

                {userSections.map((section, index) => (
                    index ==  0 
                        ?
                        (   <div key={index} className="flex justify-between gap-5 w-full max-w-5xl rounded-sm">
                                <div className="bg-[#38173c] w-full">
                                    <h2  className="p-2 font-bold">{section.name}</h2>
                                    <div className="bg-[#2d0e22] py-3 px-2">
                                        <div className="bg-[#121e17] p-2 grid grid-cols-2 gap-4">
                                            {section.games.map((gameId, index) => (
                                                
                                                allGames.map((game, index) => (
                                                    game.id === gameId 
                                                    ?
                                                        <Image key={gameId} className="max-h-36 w-full rounded-md cursor-pointer" src={game.photo} alt={game.name} width={300} height={175}/>
                                                    :
                                                        ""
                                                ))

                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#38173c] py-3 px-2 max-w-48 w-full rounded-sm">
                                    <h3 className="font-bold">Generos mais jogados</h3>
                                    <ul className="pl-2">
                                    
                                        <li className="hover:underline cursor-pointer">Adventure</li>
                                        <li className="hover:underline cursor-pointer">Horror</li>
                                        <li className="hover:underline cursor-pointer">Fantasy</li>
                                        <li className="hover:underline cursor-pointer">Visual Novel</li>
                                        <li className="hover:underline cursor-pointer">Cute</li>
                                        
                                    </ul>
                                </div>
                            </div>
                        ) 
                        : 
                        (   
                            <div key={index} className="max-w-[763px] rounded-sm">
                                <div className="bg-[#38173c] w-full">
                                    <h2  className="p-2 font-bold">{section.name}</h2>
                                    <div className="bg-[#2d0e22] py-3 px-2">
                                        <div className="bg-[#121e17] p-2 grid grid-cols-2 gap-4">
                                            {section.games.map((gameId, index) => (
                                                
                                                allGames.map((game, index) => (
                                                    game.id === gameId 
                                                    ?
                                                        <Image key={gameId} className="max-h-36 w-full rounded-md cursor-pointer" src={game.photo} alt={game.name} width={300} height={175}/>
                                                    :
                                                        ""
                                                ))

                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                }

                <div className="max-w-[763px] rounded-sm">

                    <div className="bg-[#38173c] w-full">
                        <h2  className="p-2 font-bold">Comentarios</h2>
                       <div className="bg-[#2d0e22] py-3 px-2 flex gap-2">
                            <div  className="bg-[#555555] p-0.5 w-fit h-fit">
                                <Image className="max-w-12 max-h-12 rounded-sm "  
                                        src={`/icons/f113017b004bd1b1467a84a7d7a2199a1dc662f3.png`} // Different random int for each image
                                        alt={`...`}
                                        width={50}
                                        height={50}/>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <h2 className="font-bold">Reprehenderit sunt</h2>
                                    <p className="bold text-[#56707f]">3/jan./2021 às 5:56 </p>
                                </div>
                                
                                <p className="text-sm">Pariatur cillum cupidatat qui laboris occaecat nulla cupidatat aute consectetur velit. Elit veniam cupidatat nulla officia nisi amet. Ut mollit excepteur fugiat voluptate aute. Cupidatat ipsum fugiat culpa velit mollit ipsum dolore ad aute tempor minim ullamco consectetur. Laborum ipsum aliqua laboris tempor velit est aute magna labore voluptate.</p>
                            </div>
                       </div>

                       <div className="bg-[#2d0e22] py-3 px-2 flex gap-2">
                            <div  className="bg-[#555555] p-0.5 w-fit h-fit">
                                <Image className="max-w-12 max-h-12 rounded-sm "  
                                        src={`/icons/894be2d9dd6a2444ca8776bbb7047f579d2e9763.png`} // Different random int for each image
                                        alt={``}
                                        width={50}
                                        height={50}/>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <h2 className="font-bold">Reprehenderit sunt</h2>
                                    <p className="bold text-[#56707f]">3/jan./2021 às 5:56 </p>
                                </div>
                                
                                <p className="text-sm">Pariatur cillum cupidatat qui laboris occaecat nulla cupidatat aute consectetur velit. Elit veniam cupidatat nulla officia nisi amet. Ut mollit excepteur fugiat voluptate aute. Cupidatat ipsum fugiat culpa velit mollit ipsum dolore ad aute tempor minim ullamco consectetur. Laborum ipsum aliqua laboris tempor velit est aute magna labore voluptate.</p>
                            </div>
                       </div>

                       <div className="bg-[#2d0e22] py-3 px-2 flex gap-2">
                            <div  className="bg-[#555555] p-0.5 w-fit h-fit">
                                <Image className="max-w-12 max-h-12 rounded-sm "  
                                        src={`/icons/398f1a66a106c01cb1b33533c7cf4724b2ece172.png`} // Different random int for each image
                                        alt={``}
                                        width={50}
                                        height={50}/>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <h2 className="font-bold">Reprehenderit sunt</h2>
                                    <p className="bold text-[#56707f]">3/jan./2021 às 5:56 </p>
                                </div>
                                
                                <p className="text-sm">Pariatur cillum cupidatat qui laboris occaecat nulla cupidatat aute consectetur velit. Elit veniam cupidatat nulla officia nisi amet. Ut mollit excepteur fugiat voluptate aute. Cupidatat ipsum fugiat culpa velit mollit ipsum dolore ad aute tempor minim ullamco consectetur. Laborum ipsum aliqua laboris tempor velit est aute magna labore voluptate.</p>
                            </div>
                       </div>

                       <div className="bg-[#2d0e22] py-3 px-2 flex gap-2">
                            <div  className="bg-[#555555] p-0.5 w-fit h-fit">
                                <Image className="max-w-12 max-h-12 rounded-sm "  
                                        src={`/icons/00f7fa80ca60801cc800753f910fcd0c822d4df8.png`} // Different random int for each image
                                        alt={``}
                                        width={50}
                                        height={50}/>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <h2 className="font-bold">Reprehenderit sunt</h2>
                                    <p className="bold text-[#56707f]">3/jan./2021 às 5:56 </p>
                                </div>
                                
                                <p className="text-sm">Pariatur cillum cupidatat qui laboris occaecat nulla cupidatat aute consectetur velit. Elit veniam cupidatat nulla officia nisi amet. Ut mollit excepteur fugiat voluptate aute. Cupidatat ipsum fugiat culpa velit mollit ipsum dolore ad aute tempor minim ullamco consectetur. Laborum ipsum aliqua laboris tempor velit est aute magna labore voluptate.</p>
                            </div>
                       </div>

                       <div className="bg-[#2d0e22] py-3 px-2 flex gap-2">
                            <div  className="bg-[#555555] p-0.5 w-fit h-fit">
                                <Image className="max-w-12 max-h-12 rounded-sm "  
                                        src={`/icons/a891af99164d0b2ce5a58c536e8dc3aaeb0b362e.png`} // Different random int for each image
                                        alt={``}
                                        width={50}
                                        height={50}/>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <h2 className="font-bold">Reprehenderit sunt</h2>
                                    <p className="bold text-[#56707f]">3/jan./2021 às 5:56 </p>
                                </div>
                                
                                <p className="text-sm">Pariatur cillum cupidatat qui laboris occaecat nulla cupidatat aute consectetur velit. Elit veniam cupidatat nulla officia nisi amet. Ut mollit excepteur fugiat voluptate aute. Cupidatat ipsum fugiat culpa velit mollit ipsum dolore ad aute tempor minim ullamco consectetur. Laborum ipsum aliqua laboris tempor velit est aute magna labore voluptate.</p>
                            </div>
                       </div>
                    </div>

                </div>

            </section>
            
            <Footer/>
        </main>
    );
}
