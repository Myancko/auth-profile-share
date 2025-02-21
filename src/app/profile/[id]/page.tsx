"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from 'cookies-next';
import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import CommentComponent from "@/app/components/comment/comment-comp";

export default function Perfil({params}: any) {

    const value : any = getCookie('user');

    const { id }: any = React.use(params);
    const [userCoockie, setUserCoockie] : any = useState(null);
    const [user, setUser] : any = useState(null);
    const [userSections, setUserSections] : any = useState([]);
    const [allGames, setGames] : any = useState([]);
    const [allComments, setAllComments] : any = useState([]);
    const getRandomInt = () => 1;
    const imageCount = 3;
    const [loading, setLoading] : any = useState(true);
    const [comment, setComment] : any = useState("");

    console.log(value, '<<<<')

    const cookie = async () => {
        const co : any = await getCookie('user');
        JSON.parse(co)
        setUserCoockie(co);
    } 

    const Post  = async ()  =>
    {
        const res = await axios.get("http://localhost:3000/commentaries")
        const data = {
            "id" : res.data.length + 1,
            "at" : id.toString(),
            "by" : JSON.parse(value).id,
            "comment" : comment,
            "date" : Date.now()
        }

        try {
            await axios.post("http://localhost:3000/commentaries", data);
        } catch (error) {
            console.error("Error posting commentary:", error);
        }

        setComment(""); // Reset comment input
            fetchComments(); // Refresh comments after posting
    }

    const fetchComments = () => {
        axios.get("http://localhost:3000/commentaries")
            .then(function(response) {
                setAllComments(response.data);
            })
            .catch(error => {
                console.error("Error fetching comments:", error);
            });
    };

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

            if (allComments.length === 0) {
                fetchComments(); // Fetch comments when initially loading
            }
        
            if (userSections.length === 0) {
                axios.get("http://localhost:3000/displays")
                    .then(function(response) {
                        let data : any = [];
                        response.data.forEach((item : any) => {
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
      },[loading]);

      

    if (user == null) 
        return (<p className="text-center mt-10">Carregando...</p>) 

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

                {userSections.map((section: any, index: any) => (
                    index ==  0 
                        ?
                        (   <div key={index} className="flex justify-between gap-5 w-full max-w-5xl rounded-sm">
                                <div className="bg-[#38173c] w-full">
                                    <h2  className="p-2 font-bold">{section.name}</h2>
                                    <div className="bg-[#2d0e22] py-3 px-2">
                                        <div className="bg-[#121e17] p-2 grid grid-cols-2 gap-4">
                                            {section.games.map((gameId: any, index: any) => (
                                                
                                                allGames.map((game: any, index: any) => (
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
                                            {section.games.map((gameId : any, index : any) => (
                                                
                                                allGames.map((game : any, index : any) => (
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
                                        src={value ? JSON.parse(value).foto_de_perfil :  `/icons/f113017b004bd1b1467a84a7d7a2199a1dc662f3.png`} // Different random int for each image
                                        alt={`...`}
                                        width={50}
                                        height={50}/>
                            </div>
                            <div className="w-full">
                               <textarea value={comment} onChange={e => (setComment(e.target.value))} className="w-full p-1  rounded-sm resize-none outline-none bg-gray-700" name="" id="" placeholder="Adicione o seu commentario"></textarea>
                                {
                                    comment.length > 0 
                                    ? 
                                    <div className="flex justify-end ">
                                        <button onClick={Post} className="self-end p-1 rounded-sm hover:bg-green-600 bg-green-400" >Enviar</button>
                                    </div>
                                    :
                                    ""
                                }
                            </div>
                       </div>

                       {
                            allComments ? (
                                allComments.map((comment:any, index:any) => {
                                    
                                    if (comment.at == id)
                                    {

                                        return (
                                            <CommentComponent key={index} at={comment.at} by={comment.by} comment={comment.comment} date={comment.date ? comment.date : ""}/>
                                        );
                                    }
                                })
                            ) : (
                                <p>No comments available</p>
                            )
                        }
                    </div>

                </div>

            </section>
            
            <Footer/>
        </main>
    );
}
