'use client'

import Image from "next/image";
import addCircle from "@/../public/icons/add_circle.svg"
import edit from "@/../public/icons/edit.svg"
import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation';
import React from "react";
import imageIcon from "@/../public/icons/image.svg"
import axios from "axios";
import { getCookie } from 'cookies-next';
import { GameSectionContext } from "@/app/config/[id]/gameSectionContext";

/* 

was used befores the context

interface Game {
    id: number;
    title: string;
    photo: string;
}

interface Display {
    id: string;
    owner: string,
    name: string,
    games: string[];
}

interface GameSectionProps {
    display: Display;
    allGames: Game[];
    post?: boolean;
} */

export default function GameSection() {


    const { display, allGames, post } = useContext(GameSectionContext);

    const [postState, setPostState] = useState(post);
    
    const userCoockie:any = getCookie('user');
    const [showCreateGameModal, setShowCreateGameModal] = useState(false);
    const [addList, setAddList] = useState<any[]>(display ? display.games : []);
    const [change, setChange] = useState(false);
    const router = useRouter()
    const [displayState, setDisplayState] = useState(display);
    const [nameForBeforeUpdate, setNameForBeforeUpdate] = useState(display.name ? display.name : "Sem Nome");
    
    const AddGame = (id:any) => (
        setAddList(addList => addList.includes(id) ? addList.filter(gameId => gameId !== id) : [...addList, id])
    )
    const addGameToSection = async () => {
        let data: { id?: string; name: string; games: string[]; owner?: string } = {
            "name": displayState.name ? displayState.name : "",
            "games": addList
        };

        switch (display.id){

            case "-1":
                
                const response = await axios.get("http://localhost:3000/displays")
                display.id = response.data

                data = {
                    "id"  : String(display.id.length + 1),
                    "name": displayState.name,
                    "owner" : JSON.parse(userCoockie).id,
                    "games": addList
                }

                await axios.post("http://localhost:3000/displays" , data)
                .then(response => router.push("http://localhost:3001/config/" + JSON.parse(userCoockie).id )).then(async () => {
                    setChange(false)
                    const response = await axios.get("http://localhost:3000/displays/" + data.id)
                    console.log(response.data,  response,  "<<<<");
                    setDisplayState(response.data)
                    setNameForBeforeUpdate(response.data.name)
                    /* if (post  == true)
                        window.location.reload(); */

                })
                .catch(error => {
                    if (error.response) {
                        console.error("erro no post", error.response.data);
                    }
                });     
                break

            default:
                
                await axios.patch("http://localhost:3000/displays/" + display.id, data)
                .then(response => router.push("http://localhost:3001/config/" + JSON.parse(userCoockie).id)).then(async () => {

                    const response = await axios.get("http://localhost:3000/displays/" + display.id)
                    console.log(response.data,  response,  "<<<<");
                    setDisplayState(response.data)
                    setNameForBeforeUpdate(response.data.name)  
                    setChange(false)
                    if (postState  == true)
                        window.location.reload();
                })
                .catch(error => {

                    try {

                    axios.patch("http://localhost:3000/displays/" + String(display.id.length + 1), data)
                    .then(response => router.push("http://localhost:3001/config/" + JSON.parse(userCoockie).id)).then(async () => {
                        setChange(false)
                        /* const response = await axios.get("http://localhost:3000/displays/" + String(display.id.length + 1))
                        console.log(response.data,  response,  "<<<<");
                        setDisplayState(response.data)
                        setNameForBeforeUpdate(response.data.name)   */
   
                    })

                    }catch
                    {
                        setChange(false)
                        if (error.response) {
                            console.log(
                                error.response.data,"<  erro",
                                data,"<  data",
                                display.id,"< id",
                                display.id+1,"<  id + 1", "<<<<<<<<<<<<<<<<<<<<<<<<<<"),
                                "patch url: ", "http://localhost:3000/displays/" + display.id
                            console.error("erro no patch", error.response.data);
                        }
                    }
                    
                    
                });
                
        }
        
        
    };
    
    useEffect(() => {

        if (postState == true)
        {
            console.log('component reload')
            addGameToSection()
            setChange(false)
            setPostState(false) 
        }
            
        }, [postState]);

    return (
        <>
            <p className="border-b-2 border-black border-opacity-10 font-bold text-lg">{!change ? displayState.name : nameForBeforeUpdate}</p>
            <div className={`flex justify-between gap-5 w-full rounded-sm ${change ? "ring-1 ring-[#96ff93]/50" : ""}`}>
                <div className="bg-[#38173c] w-full">
                    <div className="flex justify-between p-2"> 
                        <h2 className="font-bold">
                            <input  className="outline-none bg-[#38173c] w-fit max-w-72" type="text" onChange={(e) => (setChange(true),setDisplayState({ ...displayState, name: e.target.value }))} placeholder={displayState ? displayState.name : 'Display sem nome'}/>
                        </h2>
                        <div className="flex">
                            <Image src={edit} alt="..." color="#9ca3af" className="fill-[#9ca3af]"/>
                            <div onClick={() => setShowCreateGameModal(!showCreateGameModal)} className=" rounded-md max-h-44 grid place-items-center cursor-pointer">
                                <Image src={addCircle} alt="..." className="" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#2d0e22] py-3 px-2">
                        <div className="bg-[#121e17] p-2 grid grid-cols-2 gap-4">
                            {
                                    displayState 
                                    ? 
                                    displayState.games.map( (gameId:any, _:any) => (
                                        allGames.map((game:any, index:any) => (

                                            game.id == gameId  
                                            ?   
                                                <Image key={index} className=" max-h-44  w-full rounded-md object-fill" src={game.photo} alt={"Game: " + game.title} width={1200} height={780}/> /* object-cover */
                                            :
                                            ""
                                        ))
                                    ))
                                    :

                                    <></>
                                }
                        </div>
                        <section className={`${showCreateGameModal ? 'fixed inset-0 bg-black bg-opacity-50 overflow-y-scroll' : 'hidden'}`} onClick={() => setShowCreateGameModal(false)}>
                            <div onClick={(e) => e.stopPropagation()} className={`z-50 ${showCreateGameModal ? '' : 'hidden'} flex flex-col gap-2 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-[#121e17] max-w-xl w-full max-h-fit h-full rounded-md p-2`}>
                                <div className="w-full h-12">
                                    <label htmlFor="new-game-wallpaper">
                                        <Image
                                            src={imageIcon}
                                            alt="..."
                                            className="w-full h-full object-contain rounded-t-md cursor-pointer"
                                        />
                                    </label>
                                    <input type="file" name="" id="new-game-wallpaper" className="hidden" />
                                </div>
                                <div className="">
                                    <input className="m-auto w-full outline-none p-2 text-center bg-[#121e17] font-semibold text-sm" placeholder="Melhor jogo do mundo" type="text" />
                                    <div className="pb-2">
                                        <div className="bg-blue-500 hover:bg-blue-700 cursor-pointer rounded-md w-fit px-3 py-1 ml-auto">
                                            <p>Criar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pl-2">
                                        <p className="font-semibold text-white ">Existentes</p>
                                        <div className="flex bg-white rounded-sm p-1">
                                            <input type="text" className="text-gray-800 outline-none" />
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00a4ff"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#121e17] outline-none text-center w-full block px-2">
                                    <input className="bg-[#121e17] outline-none text-center w-full" 
                                        type="text" value={displayState.name}  
                                        onChange={(e) => setDisplayState({ ...displayState, name: e.target.value })} />

                                    <div className="p-2 grid grid-cols-2 gap-4 max-h-80 overflow-y-scroll">

                                        {
                                            allGames.map((game:any, index:any) => (
                                                <Image className={` rounded-md ${addList.includes(game.id) ?  "ring-2 ring-[#96ff93]/50" : ""}`} key={index} src={game.photo} alt={"Game: " + game.title} width={1200} height={780} 
                                                onClick={() => AddGame(game.id)} />
                                            ))
                                        }

                                    </div>
                                    <div className="pt-2">
                                        <div className="bg-blue-500 hover:bg-blue-700 cursor-pointer rounded-md w-fit px-3 py-1 ml-auto"
                                            onClick={() => (addGameToSection())}>
                                            <p>Confirmar</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}