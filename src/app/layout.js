import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Affiliate Marketing",
    description:
        "Join our affiliate community and unlock earning potential! Promote services and products and earn commissions for successful referrals. Join us  now!",
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
