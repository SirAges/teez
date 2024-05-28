"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";
import { Toaster } from 'react-hot-toast';

const Header = () => {
    return (
        <>
            <Toaster />
            <section
                className="w-full sticky top-0 z-20 bg-background py-4"
                id="#head"
            >
                <div className="w-full flex flex-row items-center justify-between">
                    <Link
                        href="#head"
                        className="flex flex-col items-center justify-center bg-primary
                    rounded-lg px-2 py-2
                "
                    >
                        <h1 className="uppercase font-black text-white">
                            Teez
                        </h1>
                        <h1 className="capitalize text-sm leading-3 text-white">
                            Fashion
                        </h1>
                    </Link>
                    <Link
                        href="https://wa.me/2348072921210"
                        aria-label="whatsapp direct message"
                        className="w-12 h-12 rounded-lg bg-primary flex
                items-center justify-center text-accent"
                    >
                        <MessageCircle />
                    </Link>
                </div>
            </section>
        </>
    );
};
export default Header;
