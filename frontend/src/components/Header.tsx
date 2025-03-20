import React, { useEffect, useState } from "react";

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled){
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [scrolled]);

    return (
        <header 
            className={`bg-purple-600 dark:bg-purple-800 fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
                scrolled ? 'h-[70px]' : 'h-[100px]'
            } shadow-md flex items-center justify-between px-4`}
        >
            <div className="flex items-center">
                <h1 className={`text-white font-bold transition-all duration-300 ${
                    scrolled ? 'text-lg' : 'text-xl'
                }`}>
                    RBXDCPY
                </h1>
            </div>
            <div>
                <ul className="flex items-center space-x-3">
                    <li className="text-white">Username</li>
                    <li><img src="avatar-default.svg" className="w-[45px] rounded-full"/></li>
                </ul>
            </div>
        </header>
    );
}
