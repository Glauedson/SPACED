import { BannerApod } from "@/assets";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import Navbar from "@/components/layout/navbar/navbar";
import { Section } from "@/components/layout/section/section";
import { changePageName, changePageDescription } from "@/utils/meta";
import { useEffect } from "react";

export default function Apod() {

    useEffect(() => {
        changePageName("APOD - Astronomy Picture of the Day | SPACED")
        changePageDescription("Confira a Astronomy Picture of the Day da NASA: ")
    }, [])

    return (
        <>
        <Navbar />
        <Header
            pill="NASA - APOD"
            backgroundImage={BannerApod}
            title="APOD"
            description="Astronomy Picture of the Day (APOD) é um serviço da NASA que fornece diariamente uma imagem ou fotografia do universo, acompanhada de uma explicação detalhada escrita por astrônomos profissionais."
        />
        <Section className="py-6 flex flex-col items-center justify-center text-center gap-4">
            <h1 className="title text-[28px] leading-none py-4">
                Em Breve
            </h1>
            <p className="description">
                A página de Astronomy Picture of the Day (APOD) está em construção. Em breve, você poderá explorar imagens diárias do universo, acompanhadas de descrições detalhadas e informações fascinantes sobre o cosmos.
            </p>
        </Section>
        <Footer />
        </>
    )
}