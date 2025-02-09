"use client";

interface TextInputProps {
    label: string;
    data: string;
    type: string;
    onChange: (value: string) => void;
}

export default function TextInput({ label, data, type, onChange }: TextInputProps) {
    const styleLabels = "font-bold text-xs";
    const styleInputs = " outline-none rounded-sm p-1 h-[28px] bg-[#4d4d4d] hover:bg-[#666] text-xs";
 
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
