import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Teez Fashion",
    description:
        "Your number one tshirt vendor.",
    icons: {
        icon: "/assets/images/aflogo.png"
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-background px-6 h-screen `}
            >
                {children}
            </body>
        </html>
    );
}
