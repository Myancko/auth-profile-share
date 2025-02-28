    "use client"

    import Link from "next/link";
    import Image from "next/image";
    import { useState } from "react";
    import { setCookie } from 'cookies-next';
    import { useRouter } from 'next/navigation'

    import morning from "@/../public/images/morning.png"
    import evening from "@/../public/images/evening.jpg"
    import night from "@/../public/images/night.jpg"

    import axios from "axios";

    export default function Login() {

        const router = useRouter()
        const [login, setLogin] = useState('');
        const [password, setPassword] = useState('');
        const time = new Date()
        var nameBgImage : any   

        if (time.getHours() >= 5 && time.getHours() < 12) {
            nameBgImage = morning
        } else if (time.getHours() >= 12 && time.getHours() < 20) {
            nameBgImage = evening
        } else if (time.getHours() >= 20 || time.getHours() < 5) {
            nameBgImage = night
        }
        

        const Login = async () => {

            axios.get("http://localhost:3000/users")
            
            .then(function(response) {
                
                for (var data of response.data)
                {
                    if (data.user == login && data.password == password)
                    {
                        console.log(data)
                        setCookie('user', data);
                        router.push('/profile/'+data.id)
                    }
                }
                
            })
            .catch(function(error) {
                // Handle errors here
                console.error('Error fetching users:', error);
            });
        }


    return (
        
        <main className="w-screen h-screen flex flex-col justify-center" style={{ backgroundImage: `url('/images/${nameBgImage}.jpg')`, backgroundSize: "cover",backgroundPosition: "center",backgroundRepeat: "no-repeat"}}>
            <Image className="absolute w-screen h-screen" alt="image relative to the time of the day" src={nameBgImage} width={1200} height={780}/>
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <section className=" max-w-3xl m-auto w-full z-10">
                <h1 className="white font-bold text-xl px-6 py-8">Iniciar Sessão</h1>
                <form className="bg-[#181a21] px-6 py-8 flex flex-col rounded-sm gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="user">Iniciar sessão com o nome de usuario</label>
                        <input className="rounded-sm p-2 bg-[#32353c] outline-none  hover:bg-[#393c44]" type="text" onChange={(userInput) => setLogin(userInput.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="user">Senha</label>
                        <input className="rounded-sm p-2 bg-[#32353c] outline-none  hover:bg-[#393c44]" type="password" onChange={(userInput) => setPassword(userInput.target.value)}/>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-[#32353c] w-6 flex justify-center rounded-sm p-1 cursor-pointer">
                            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg>
                        </div>
                        <label htmlFor="" className="text-sm">Lambre-se de mim</label>
                    </div>
                    
                    <div className="w-full">
                        <Link href={"/sign-on"}><p className="hover:text-blue-400">Não possui uma conta?</p></Link>
                        <div onClick={Login} className="text-center bg-blue-400 hover:bg-blue-300 cursor-pointer max-w-64 py-2 m-auto rounded-sm">Iniciar sessão</div>
                    </div>
                    {/* <Link href="" className="underline text-center mt-4">Não consigo iniciar a sessão</Link> */}
                </form>
            </section>
        </main>
    );
    }