'use client'

import Link from "next/link";
import Image from "next/image";
import SignInput from "../components/sign-inputs/sign-inputs";
import { useState } from "react";
import noProfilePic from "@/../public/images/user-profile-placeholder.jpg"
import axios from "axios";
import { useRouter } from 'next/navigation';

import morning from "@/../public/images/morning.png"
import evening from "@/../public/images/evening.jpg"
import night from "@/../public/images/night.jpg"

export default function Login() {

    const [selectedImage, setSelectedImage] = useState(noProfilePic);
    const time = new Date()
    const router = useRouter();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [d, setD] = useState('');
    const [password, setPassword] = useState('');

    var nameBgImage : any = ''
    
    if (time.getHours() >= 5 && time.getHours() < 12) {
        nameBgImage = morning
    } else if (time.getHours() >= 12 && time.getHours() < 20) {
        nameBgImage = evening
    } else if (time.getHours() >= 20 || time.getHours() < 5) {
        nameBgImage = night
    }

    const handleImageChange = (event : any) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl : any = URL.createObjectURL(file);
          console.log(imageUrl, '<<<::')
          setSelectedImage(imageUrl);
        }
      };

    const Register = async () => {

        let id = 1;

        try {
            const response = await axios.get("http://localhost:3000/users");
            id = response.data.length + 1;
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return error
        }

        var data = {
            "id" : id.toString(),
            "user": nome || "",
            "description": "", 
            "email": email || "",
            "password": password || "",  
            "data_de_aniversario": d || "",
            "foto_de_perfil": "https://picsum.photos/200", /* n da pra user n jserver */
            "data_de_criacao_do_registro": new Date().toLocaleDateString(),
            "data_de_atualizacao_do_registro": new Date().toLocaleDateString(),
            "data_de_delecao_do_registro": "", 
            "dados_do_endereco_completo": {
                "rua": "",  
                "numero": "",
                "complemento": "",
                "bairro": "",
                "cidade": "",
                "estado": "",
                "cep": "",
                "pais": ""
            }
        }

        axios.post("http://localhost:3000/users", data).then(response => {
            console.log(response);
            router.push('/sign-in'); 
          }).catch(error => {
            console.error(error);
        })
    }

  return (
    
    <main className="w-screen h-screen flex flex-col justify-center" style={{ backgroundImage: `url('/images/${nameBgImage}.jpg')`, backgroundSize: "cover",backgroundPosition: "center",backgroundRepeat: "no-repeat"}}>
        <Image className="absolute w-screen h-screen" alt="image relative to the time of the day" src={nameBgImage} width={1200} height={780}/>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <section className=" max-w-3xl m-auto w-full z-10">
            <h1 className="white font-bold text-xl px-6 py-8">Registrar uma conta</h1>
            <form className="bg-[#181a21] px-6 py-8 flex flex-col rounded-sm gap-2">
                <div className="grid grid-cols-3 ">
                    <div className="flex flex-col gap-1 col-span-2">
                        <SignInput label="Nome:" data="Você tem um né?" type="text" onChange={setNome}/>
                        <SignInput label="Email:" data="Exemplo@exemp.com" type="email" onChange={setEmail}/>
                        
                    </div>
                    <div className="col-span-1 m-auto content-center">

                        <label htmlFor="profile-pic" className="cursor-pointer">
                            <Image className="rounded-full max-w-28 w-28 max-h-28 h-full object-contain" src={selectedImage} alt="..." width={1200} height={780}/>
                        </label>
                        <input type="file" className="hidden" name="profile-pic" id="profile-pic" accept="image/*" onChange={handleImageChange}/>
                    </div>
                </div>
                <SignInput label="Data de Aniversario:" data="4/6/1989" type="text" onChange={setD}/>
                <SignInput label="Confirme a senha:" data="senhao" type="password" onChange={setPassword}/>
                <SignInput label="Confirme a senha:" data="senha so q errada" type="password" onChange={setPassword}/>
                <div className="flex items-center gap-2">
                    <div className="bg-[#32353c] w-6 flex justify-center rounded-sm p-1 cursor-pointer">
                        <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg>
                    </div>
                    <label htmlFor="" className="text-sm">Lambre-se de mim</label>
                </div>
                
                <div className="w-full">
                    <Link href="/sign-in" className="hover:text-blue-400">já possui uma conta?</Link>
                    <div onClick={() => Register()} className="text-center bg-blue-400 hover:bg-blue-300 cursor-pointer max-w-64 py-2 m-auto rounded-sm">Iniciar sessão</div>
                </div>
                {/* <Link href="" className="underline text-center mt-4">Não consigo iniciar a sessão</Link> */}
            </form>
        </section>
    </main>
  );
}