import { SectionOne, Footer, Header } from "../components/";
export default function Home() {
    return (
        <main
            className="flex h-full flex-col items-center 
        "
        >
            <Header />
            <div className="flex h-full w-full items-center justify-center">
                <SectionOne />
            </div>

            <Footer />
        </main>
    );
}
