import { BannerIss } from "@/assets";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import Navbar from "@/components/layout/navbar/navbar";
import { Section } from "@/components/layout/section/section";
import { changePageDescription, changePageName } from "@/utils/meta";
import { useEffect } from "react";

export default function ISS() {

    useEffect(() => {
        changePageName("ISS — Estação Espacial Internacional | SPACED");
        changePageDescription(
            "Acompanhe informações sobre a Estação Espacial Internacional, sua localização e dados atuais em órbita da Terra."
        );
    }, []);

    return(
        <>
        <Navbar />
        <Header
            pill="Open-Notify"
            backgroundImage={BannerIss}
            title="ISS"
            description="Explore informações em tempo real sobre a Estação Espacial Internacional (ISS), incluindo sua localização atual, velocidade, altitude e muito mais. Acompanhe a jornada da ISS enquanto ela orbita a Terra e descubra curiosidades fascinantes sobre este incrível laboratório espacial."
        />
        <Section className="py-6 flex flex-col items-center justify-center text-center gap-4">
            <h1 className="title text-[28px] leading-none py-4">
                Em Breve
            </h1>
            <p className="description">
                A página da ISS está atualmente em desenvolvimento. Em breve, você poderá acessar informações detalhadas sobre a Estação Espacial Internacional, incluindo sua localização em tempo real, velocidade, altitude e muito mais. Fique atento para atualizações futuras!
            </p>
        </Section>
        <Footer />
        </>
    )
}