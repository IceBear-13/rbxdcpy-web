import React from "react";

interface Emailinput{
  id: string,
  labelContent: string,
  name: string,
};

export default function Emailbox({id, labelContent, name}: Emailinput){
  return(
      <div> 
          <label htmlFor={name} className="text-[18px]">{labelContent}</label>
          <input
            type="email"
            name={name}
            id={id}
            className="w-full border-b-1 mb-3 focus:outline-none"
          />
      </div> 
  )
}
