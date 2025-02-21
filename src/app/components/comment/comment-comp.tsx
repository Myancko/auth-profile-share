"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
    at : string,
    by : [],
    comment : string,
    date : Date | string
}

export default function CommentComponent({ at, by, comment, date }: Comment) {

    const [commenter, setCommenter] : any = useState("");
    const formatDate = (date: Date | string) => {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1; // Month is 0-based
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        return `${day}/${month}/${year} às ${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    };

    console.log(by,">>>>>")
    useEffect(() => {

        const GetCommenter = async () =>
        {
            await axios.get(`http://localhost:3000/users/`+by)
                .then(function(response){
                    setCommenter(response.data) 
                    console.log(response.data)
                }) 
                
        }
        GetCommenter()
         
        
      },[]);

    
    return (
        <div className="bg-[#2d0e22] py-3 px-2 flex gap-2">
             <div  className="bg-[hsl(0,0%,33%)] p-0.5 w-fit h-fit">
                 <Image className="max-w-12 max-h-12 rounded-sm "  
                         src={`/icons/894be2d9dd6a2444ca8776bbb7047f579d2e9763.png`} // Different random int for each image
                         alt={``}
                         width={50}
                         height={50}/>
             </div>
             <div>
                <div className="flex gap-2 ">
                    <h2 className="font-bold">{commenter ? commenter.user : "loading"}</h2>
                    <p className="bold text-[#56707f]">{date ? formatDate(date) : "No date"} </p>
                </div>
                
                <p className="text-sm">{comment}</p>
             </div>
        </div>
    );
}
