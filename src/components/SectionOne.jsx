"use client";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "./";
import { prod } from "../lib/data";
import { PaystackButton } from "react-paystack";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast from "react-hot-toast";
const SectionOne = () => {
    const [buy, setBuy] = useState(false);
    const [checking, setChecking] = useState(false);
    const [buyProd, setBuyProd] = useState({
        image: "",
        title: "",
        price: "",
        colors: [],
        sizes: []
    });
    const [info, setInfo] = useState({
        email: "",
        address: "",
        city: "",
        state: "",
        postal: "",
        country: "",
        colors: [],
        sizes: []
    });

    const formData = [
        {
            id: "email",
            name: "email",
            type: "email",
            label: "email",
            placeholder: "your email"
        },
        {
            id: "address",
            name: "address",
            type: "text",
            label: "address",
            placeholder: "your address"
        },
        {
            id: "city",
            name: "city",
            type: "text",
            label: "city",
            placeholder: "your city"
        },
        {
            id: "state",
            name: "state",
            type: "text",
            label: "state",
            placeholder: "your state "
        },
        {
            id: "postal",
            name: "postal",
            type: "text",
            label: "postal code",
            placeholder: "your postal code "
        },
        {
            id: "country",
            name: "country",
            type: "text",
            label: "country",
            placeholder: "your country "
        }
    ];

    const { email, address, city, state, postal, country, colors, sizes } =
        info;

    const { image, price, title } = buyProd;
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    const canPay =
        [email, address, city, state, postal, country, price, title].every(
            Boolean
        ) &&
        sizes.length &&
        colors.length;
    const componentProps = {
        email,
        amount: price * 100,
        metadata: {
            email,
            address,
            city,
            state,
            postal,
            country,
            colors,
            sizes
        },
        publicKey,
        text: "Checkout",
        onSuccess: ({ reference }) => {
            setChecking(true);
            const res = axios
                .post("api/mail", {
                    email,
                    address,
                    city,
                    state,
                    postal,
                    country,
                    colors,
                    sizes,
                    price,
                    title
                })
                .then(res => {
                    if (res.status === 200) {
                        toast.custom(t => (
                            <div
                                className={`${
                                    t.visible
                                        ? "animate-enter"
                                        : "animate-leave"
                                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                            >
                                <div className="flex-1 w-0 p-4">
                                    <div className="flex items-start">
                                        <div className=" relative pt-0.5 h-10 w-10 ">
                                            <Image
                                                className="object-contain rounded-full"
                                                fill
                                                src={image}
                                                alt={title}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                {title}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                ${price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex border-l border-gray-200">
                                    <button
                                        onClick={() => toast.dismiss(t.id)}
                                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        ));
                        setBuyProd({
                            image: "",
                            title: "",
                            price: "",
                            colors: [],
                            sizes: []
                        });
                        setInfo({
                            email: "",
                            address: "",
                            city: "",
                            state: "",
                            postal: "",
                            country: "",
                            colors: [],
                            sizes: []
                        });
                        setChecking(false);
                        setBuy(false);
                    }
                });
        },
        onClose: () => alert("Wait! You need this tshirt, don't go!!!!")
    };
    const handleInfo = (type, clicked) => {
        if (info[type].includes(clicked)) {
            const filtered = info[type].filter(f => f !== clicked);
            setInfo(prev => ({ ...prev, [type]: filtered }));
        } else {
            setInfo(prev => ({ ...prev, [type]: [...prev[type], clicked] }));
        }
    };
    if (checking) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <p>loading...</p>
            </div>
        );
    }
    return (
        <section
            className="items-start rounded-lg flex flex-1
             max-w-full "
            id="#1"
        >
            {buy ? (
                <div
                    className="flex w-full  bg-white shadow shadow-lg
                    items-start rounded-lg space-y-2 py-2 px-2 flex-col max-h-96
                    bg-red-600 h-96
                    relative
                    "
                >
                    <X
                        onClick={() => setBuy(false)}
                        className="absolute z-20 top-4 right-4 text-primary "
                    />
                    <form
                        className="md:w-1/2 flex-1  min-w-full w-full
                        rounded-lg space-y-2 overflow-y-scroll relative "
                    >
                        {formData.map(
                            ({ id, label, type, placeholder, name }) => (
                                <div
                                    key={id}
                                    className="flex flex-col items-start "
                                >
                                    <label
                                        className="text-primary capitalize
                                            font-medium"
                                        htmlFor={id}
                                    >
                                        {label}
                                    </label>
                                    <input
                                        className="bg-card rounded-lg px-2
                          placeholder:text-secondary/20     outline-none            py-2 w-full"
                                        id={id}
                                        value={info[id]}
                                        onChange={e =>
                                            setInfo(prev => ({
                                                ...prev,
                                                [e.target.name]: e.target.value
                                            }))
                                        }
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                    />
                                </div>
                            )
                        )}
                    </form>
                    <div className="flex items-center space-x-4">
                        <h1 className="capitalize font-medium">Colors:</h1>
                        {buyProd?.colors?.map(c => (
                            <p
                                key={c}
                                onClick={() => handleInfo("colors", c)}
                                style={{ backgroundColor: c }}
                                className="w-5 h-5 rounded-md"
                            >
                                {info?.colors?.includes(c) ? (
                                    <Check className="text-white" />
                                ) : null}
                            </p>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4">
                        <h1 className="capitalize font-medium">sizes:</h1>
                        {buyProd?.sizes?.map(s => (
                            <p
                                key={s}
                                onClick={() => handleInfo("sizes", s)}
                                style={{
                                    color: info?.sizes?.includes(s)
                                        ? "#ffffff"
                                        : null,
                                    backgroundColor: info?.sizes?.includes(s)
                                        ? "#940000"
                                        : null
                                }}
                                className="w-fit h-fit p-0.5 rounded-md uppercase"
                            >
                                {s}
                            </p>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4">
                        <h1 className="capitalize font-medium">Quantity</h1>
                        <p
                            className="w-fit h-fit p-0.5 rounded-md
                            capitalize"
                        >
                            {info.sizes.length > 0 && info.colors.length > 0
                                ? info.sizes.length * info.colors.length
                                : info.sizes.length * 1 +
                                  info.colors.length * 1}
                        </p>
                    </div>
                    <div className="flex items-center justify-between bg-background/40 w-full rounded-lg px-4 py-4">
                        <div className="flex flex-col items-start">
                            <h1 className="capitalize">{buyProd.title}</h1>
                            <h1 className="capitalize">
                                $
                                {buyProd.price *
                                    (info.colors.length > 0
                                        ? info.colors.length
                                        : 1) *
                                    (info.sizes.length > 0
                                        ? info.sizes.length
                                        : 1)}
                            </h1>
                        </div>
                        <div
                            className={`${
                                canPay ? "bg-primary" : "bg-primary/50"
                            } text-white rounded-lg w-fit
                        px-2 py-2`}
                        >
                            {canPay ? (
                                <PaystackButton {...componentProps} />
                            ) : (
                                <h1
                                    onClick={() =>
                                        toast.error("All field must be filled")
                                    }
                                >
                                    Checkout
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <Carousel
                    className="w-full flex-1"
                    autoPlay={true}
                    interval={3000} // Delay between slides in milliseconds
                    infiniteLoop={true} // Loop the carousel
                    showStatus={false} // Hide status indicator
                    showThumbs={false} // Hide thumbnail navigation
                    showArrows={false} // Show navigation arrows
                    stopOnHover={true} // Don't stop autoplay on hover
                    transitionTime={500}
                    showIndicators={false}
                >
                    {prod.map(({ title, price, image, colors, sizes }) => (
                        <div key={title}>
                            <ProductCard
                                buyProd={buyProd}
                                colors={colors}
                                sizes={sizes}
                                setBuyProd={setBuyProd}
                                buy={buy}
                                setBuy={setBuy}
                                title={title}
                                price={price}
                                image={image}
                            />
                        </div>
                    ))}
                </Carousel>
            )}
        </section>
    );
};

export default SectionOne;
