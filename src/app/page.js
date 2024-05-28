import {
    SectionOne,
    Footer,
    Header
} from "../components/";
export default function Home() {
    return (
        <main
            className="flex h-full flex-col items-center space-y-12
        "
        >
            <Header />
            <SectionOne />
           
            <Footer />
            
        </main>
    );
}
