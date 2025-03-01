'use client'

import Image from "next/image";
import noProfilePic from "@/../public/images/user-profile-placeholder.jpg"
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import GameSection from "../../components/game-section/game-section";
import TextInput from "@/app/components/default-text-input/default-text-input";
import { getCookie } from 'cookies-next';
import Header from "@/app/components/header/header";
import { useParams } from "next/navigation";
import { GameSectionContext } from "./gameSectionContext";

interface Params {
    id: string;
}


export default function ({ params }: { params: Promise<Params> }){

    const { id } = useParams()
    const [userCoockie, setUserCoockie]:any = useState(null);
    const [user, setUser] : any = useState(null) ;
    const [userSections, setUserSections] : any = useState<{ id: string; owner: string; name: string; games: any[] }[]>([]);
    const [allGames, setGames] = useState([]);
    const [selectedImage, setSelectedImage] : any = useState(noProfilePic);
    const [userName, setUserName]: any = useState(null);
    const [description, setDescription] : any = useState(null);
    const [email, setEmail] : any = useState(null);
    const [password, setPassword] : any = useState(null);
    const [dataDeAniversario, setDataDeAniversario] : any = useState(null);
    const [fotoDePerfil, setFotoDePerfil] : any = useState(null);
    const [rua, setRua] : any = useState(null);
    const [numero, setNumero] : any = useState(null);
    const [complemento, setComplemento] : any = useState(null);
    const [bairro, setBairro] : any = useState(null);
    const [cidade, setCidade] : any = useState(null);
    const [estado, setEstado] : any = useState(null);
    const [cep, setCep] : any = useState(null);
    const [pais, setPais] : any = useState(null);
    const [postComponent, setPostComponent] : any = useState(false);
    const [imgJserver, setImgJserver] : any = useState(null);

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            console.log(imageUrl, '<<<::')
            setSelectedImage(imageUrl);
            setImgJserver(true)
        }
    };

    async function PostUserChanges() {
        var data = {
            "id": id,
            "user": userName || (user ? user.user  : ""),
            "description": description || (user ? user.description : ""),
            "email": email || (user ? user.email : ""),
            "password": password || (user ? user.password : ""),
            "data_de_aniversario": dataDeAniversario || (user ? user.data_de_aniversario : ""),
            "foto_de_perfil": user.foto_de_perfil,/*  fotoDePerfil || (user ? user.foto_de_perfil : ""),  */
            "data_de_criacao_do_registro": (user ? user.data_de_criacao_do_registro : ""),
            "data_de_atualizacao_do_registro": new Date().toLocaleDateString(),
            "data_de_delecao_do_registro": "none",
            "dados_do_endereco_completo": {
                "rua": rua || (user ? user.dados_do_endereco_completo.rua : ""),
                "numero": numero || (user ? user.dados_do_endereco_completo.numero : ""),
                "complemento": complemento || (user ? user.dados_do_endereco_completo.complemento : ""),
                "bairro": bairro || (user ? user.dados_do_endereco_completo.bairro : ""),
                "cidade": cidade || (user ? user.dados_do_endereco_completo.cidade : ""),
                "estado": estado || (user ? user.dados_do_endereco_completo.estado : ""),
                "cep": cep || (user ? user.dados_do_endereco_completo.cep : ""),
                "pais": pais || (user ? user.dados_do_endereco_completo.pais : "")
            }
        }

        try {
            const response = await axios.patch(`http://localhost:3000/users/`+id, data);
            setPostComponent(true)
            return response;
        }
        catch (error) {
            console.error("Error posting user changes:", error);
        }
    }

    const addDisplay = () => {

        setUserSections( (prevSections: any)  => [...prevSections , { id: "-1", owner: id, name:"Display sem nome",games: [] }]
            
        );
    };
    

    useEffect(() => {
        
        if (!id) return;
        if (!user) {
            const cookie = async () => {
                const co : any = await getCookie('user');
                JSON.parse(co)
                setUserCoockie(co);
            } 
            cookie()
            axios.get(`http://localhost:3000/users/${id}`)
                .then(function (response) {
                    setUser(response.data)
                    setSelectedImage((prev:any) => prev === noProfilePic ? response.data.foto_de_perfil || noProfilePic : prev);
                })
        }

        if (userSections.length === 0) {
            axios.get("http://localhost:3000/displays")
                .then(function (response) {
                    let data:any = [];
                    response.data.forEach((item:any) => {
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
                .then(function (response) {
                    console.log(response.data, "<<<");
                    setGames(response.data);
                })
                .catch(error => {
                    console.error("Error fetching games:", error);
                });
        }
        console.log(allGames, "<<<<<<<");

    }, [id, user]);

    if (user == null) return ( <p className="text-center mt-10">Carregando...</p> )
    if (id == JSON.parse(userCoockie).id)  return (
        <main className="relative w-screen h-screen overflow-x-hidden">

            <Header/>

            <section className="relative m-auto max-w-5xl min-h-80 w-full bg-gradient-to-b from-purple-900 to-purple-950 px-3 py-4 flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <p className="border-b-2 border-black border-opacity-10 font-bold text-lg">Profile</p>
                    <div className="flex flex-col">
                        <TextInput label="Nome:" data={userName || user.user} type="text" onChange={setUserName} />
                    </div>
                    <div className="flex flex-col">
                        <TextInput label="Descrição:" data={description || user.description} type="text" onChange={setDescription} />
                    </div>
                    <div className="w-fit">
                        <p className="font-bold text-xs">Avatar: {imgJserver ? "Vai manda a imagem pro Jserver como?, base64???" : ""}</p>
                        <label htmlFor="profile-pic" className="cursor-pointer">
                            <Image
                                width={1200} height={780}
                                src={selectedImage}
                                alt="pic"
                                className="max-w-48 max-h-48 w-full h-full rounded object-cover"
                            />
                        </label>
                        <input
                            type="file"
                            className="hidden"
                            name="profile-pic"
                            id="profile-pic"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="flex justify-between gap-3 flex-wrap">
                        <div className="flex flex-col w-full gap-3 flex-1">
                            <TextInput label="País:" data={pais || user.dados_do_endereco_completo.pais} type="text" onChange={setPais} />
                            <div className="grid grid-cols-3 gap-3">
                                <TextInput label="Estado:" data={estado || user.dados_do_endereco_completo.estado} type="text" onChange={setEstado} />
                                <TextInput label="Cidade:" data={cidade || user.dados_do_endereco_completo.cidade} type="text" onChange={setCidade} />
                                <TextInput label="CEP:" data={cep || user.dados_do_endereco_completo.cep} type="text" onChange={setCep} />
                            </div>
                            <TextInput label="Bairro:" data={bairro || user.dados_do_endereco_completo.bairro} type="text" onChange={setBairro} />
                            <div className="flex justify-between gap-3">
                                <TextInput label="Rua:" data={rua || user.dados_do_endereco_completo.rua} type="text" onChange={setRua} />
                                <TextInput label="Número:" data={numero || user.dados_do_endereco_completo.numero} type="text" onChange={setNumero} />
                            </div>
                            <TextInput label="Complemento:" data={complemento || user.dados_do_endereco_completo.complemento} type="text" onChange={setComplemento} />
                        </div>
                        <div className="flex flex-col w-full flex-1">
                            <label htmlFor="" className="font-bold text-xs">Data de Aniversário:</label>
                            <input
                                type="text"
                                placeholder={dataDeAniversario || "02/20/2002"}
                                className="outline-none rounded-sm p-1 bg-[#4d4d4d] hover:bg-[#666] text-xs h-[28px]"
                                onChange={e => setDataDeAniversario(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {
                    userSections.map((section: any, index: any) => (
                        <GameSectionContext.Provider key={index} value={{ display: section, allGames, post: postComponent }} >
                            <GameSection key={index} />
                        </GameSectionContext.Provider>
                    ))
                }

                <div className="flex gap-2 justify-end">
                    <div className="bg-slate-700 hover:bg-blue-600 transition w-fit p-2 rounded-sm text-xs cursor-pointer" onClick={addDisplay}>
                        <p className="text-xs">Adicionar Sessão</p>
                    </div>
                    <div className="bg-slate-700 hover:bg-green-600 cursor-pointer transition w-fit p-2 rounded-sm text-xs" onClick={() => PostUserChanges()}>
                        <p className="text-xs">Confirmar</p>
                    </div>
                </div>

            </section>
        </main>
    )
    if (id != JSON.parse(userCoockie).id)  return (
        <main className="grid justify-center relative w-screen h-screen overflow-x-hidden">
            <section className=" flex justify-center items-center  font-bold relative m-auto max-w-5xl min-h-80 w-full bg-gradient-to-b from-purple-900 to-purple-950 px-3 py-4">
                <h1 className="">Voce nao tem permissao para ver essa pagina</h1>
            </section>    
        </main>
    )
}