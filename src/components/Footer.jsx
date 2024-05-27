"use client";
import Image from "next/image";
import Link from "next/link";
import { hows } from "../lib/data";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <section className=" flex flex-col space-y-6 w-full" id="#3">
            <div className="bg-primary h-[1px] w-full" />
            <div
                className="flex flex-col md:flex-row md:justify-between
           items-center space-y-4"
            >
                <h1 className="text-secondary">Teez Fashion</h1>
                <p className="text-secondary">Copyright &copy; {year}</p>
            </div>
        </section>
    );
};
export default Footer;
