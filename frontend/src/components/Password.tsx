import React from "react";

interface Passwordbox{
    id: string,
    labelContent: string,
    name: string,
};

export default function Passwordbox({id, labelContent, name}: Passwordbox){
    return(
        <div>
          <label htmlFor="password" className="text-[18px]">{labelContent}</label>
          <input
            type="password"
            name={name}
            id={id}
            className="w-full border-b-1 mb-3 focus:outline-none"
          />
        </div>
    )
}