import React from "react";

interface TextboxInput{
  id: string,
  labelContent: string,
  name: string,
};

export default function Textbox({id, labelContent, name}: TextboxInput){
  return(
      <div> 
          <label htmlFor={name} className="text-[18px]">{labelContent}</label>
          <input
            type="text"
            name={name}
            id={id}
            className="w-full border-b-1 mb-3 focus:outline-none"
          />
      </div> 
  )
}
