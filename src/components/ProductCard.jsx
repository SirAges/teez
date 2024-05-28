"use client";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const ProductCard = ({
    title,
    price,
    image,
    colors,
    sizes,
    buy,
    setBuy,
    buyProd,
    setBuyProd
}) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
    };
    const handleBuy = () => {
        setBuyProd({
            image,
            title,
            price,
            colors,
            sizes
        });

        setBuy(true);
    };
    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={variants}
            className="flex w-full  bg-white shadow shadow-lg items-start
            rounded-lg space-y-2
            py-2 px-2  flex-col h-96"
        >
            <div className="md:w-1/2 flex-1  h-96 min-w-full w-full rounded-lg relative ">
                <Image
                    className="rounded-lg object-contain object-center
                    "
                    src={image}
                    fill
                    alt={title}
                />
            </div>
            <div className="flex items-center justify-between bg-background/40 w-full rounded-lg px-4 py-4">
                <div className="flex flex-col items-start">
                    <h1 className="capitalize">{title}</h1>
                    <h1 className="capitalize">${price}</h1>
                </div>
                <h1
                    onClick={handleBuy}
                    className="capitalize bg-primary text-accent px-2 p-2 rounded-lg"
                >
                    buy now
                </h1>
            </div>
        </motion.div>
    );
};

export default ProductCard;
