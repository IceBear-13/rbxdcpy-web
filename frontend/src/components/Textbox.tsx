import React, { useState } from "react";

interface TextboxInput {
  id: string,
  labelContent: string,
  name: string,
  placeholder?: string, // Optional placeholder prop
};

export default function Textbox({ id, labelContent, name, placeholder="placeholder" }: TextboxInput) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  return (
    <div> 
      <label htmlFor={name} className="text-[18px] ">{labelContent}</label>
      <input
        type="text"
        name={name}
        id={id}
        className="w-full border-b-1 mb-3 focus:outline-none text-[20px]"
        placeholder={isFocused ? "" : placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div> 
  );
}