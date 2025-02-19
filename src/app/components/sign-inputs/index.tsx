"use client";

interface TextInputProps {
    label: string;
    data: string;
    type: string;
    onChange: (value: string) => void;
}

export default function SignInput({ label, data, type, onChange }: TextInputProps) {
    const styleLabels = "font-bold";
    const styleInputs = "rounded-sm p-2 bg-[#32353c] outline-none  hover:bg-[#393c44]";
    
    return (
        <div className="flex flex-col flex-1">
            <label htmlFor="" className={styleLabels}>{label}</label>
            <input
                type={type}
                placeholder={data}
                className={styleInputs}
                onChange={(e) => (onChange(e.target.value))}  
            />
        </div>
    );
}
