import { BannerApod } from "@/assets";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import Navbar from "@/components/layout/navbar/navbar";
import { Section } from "@/components/layout/section/section";

export default function Apod() {

    return (
        <>
        <Navbar />
        <Header
            pill="NASA - APOD"
            backgroundImage={BannerApod}
            title="Astronomy Picture of the Day"
            description="Explore o universo através das imagens diárias da NASA, revelando a beleza e os mistérios do cosmos."
        />
        <Section className="py-6 flex flex-col items-center justify-center text-center gap-4">
            <h1 className="title text-[28px] leading-none py-4">
                Em Desenvolvimento
            </h1>
            <p className="description">
                A página de Astronomy Picture of the Day (APOD) está em construção. Em breve, você poderá explorar imagens diárias do universo, acompanhadas de descrições detalhadas e informações fascinantes sobre o cosmos.
            </p>
        </Section>
        <Footer />
        </>
    )
}