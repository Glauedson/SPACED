import Navbar from "@components/layout/navbar/navbar";
import { changePageDescription, changePageName } from "@/utils/meta";
import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import { BannerHome, BannerMoon, BannerApod, BannerIss } from "@assets/index";
import { Card } from "@components/ui/card/card";
import { Image, Moon, Satellite } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    changePageName("SPACED - Explore o universo em tempo real");
    changePageDescription(
      "Descubra os fenômenos, corpos celestes e missões que ajudam a explicar o universo. A SPACED reúne informações astronômicas, imagens e dados reais para tornar a exploração espacial mais acessível e interativa."
    )
  }, [])

  // Topics
  const Topics = [
    { banner: BannerMoon, alt: "Lua cheia em tom acinzentado vista contra um céu estrelado, ilustrando o tópico de fases da lua.", icon: Moon, route: "/Lua", name: "Fases da lua", description: "Explore as fases da Lua, seus ciclos e os movimentos que determinam sua aparência no céu. Consulte informações astronômicas e descubra como nosso satélite natural influencia a observação do céu." },
    { banner: BannerApod, alt: "Campo estelar profundo destacando o brilho da Via Láctea, representando a imagem astronômica do dia.", icon: Image, route: "/APOD", name: "APOD", description: "Todos os dias, uma nova janela para o universo. Explore imagens selecionadas pela NASA acompanhadas de explicações, informações astronômicas e detalhes sobre os objetos registrados." },
    { banner: BannerIss, alt: "A Estação Espacial Internacional orbitando a Terra com o planeta e a curvatura do horizonte ao fundo.", icon: Satellite, route: "/ISS", name: "Rastreador da ISS", description: "Acompanhe a Estação Espacial Internacional em órbita da Terra. Veja sua posição, trajetória e informações sobre uma das maiores estruturas já construídas fora do nosso planeta." }
  ]

  return (
    <>
      <Navbar />
      <main>
        <Header
          pill="SOBRE A SPACED"
          backgroundImage={BannerHome}
          title="EXPLORE O UNIVERSO EM TEMPO REAL."
          description="Descubra os fenômenos, corpos celestes e missões que ajudam a explicar o universo. A SPACED reúne informações astronômicas, imagens e dados reais para tornar a exploração espacial mais acessível e interativa."
        />
        
        <Header
          align="center"
          pill="Tópicos"
          title="TÓPICOS PRINCIPAIS"
          description="Da nossa vizinhança cósmica às profundezas do espaço, explore conteúdos sobre astronomia, descubra curiosidades e consulte dados obtidos de fontes científicas e observacionais."
          children={
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
              {Topics.map((topic) => {
                const Icon = topic.icon

                return (
                  <Card className="p-0 cursor-pointer" key={topic.name}>
                    <Link to={topic.route} >
                      <img 
                        src={topic.banner}
                        alt={topic.alt} 
                        className="rounded-t-xl aspect-video w-full object-cover"
                      />

                      <div className="p-5 flex flex-col ">
                        <div className="flex gap-3 items-center">
                          <Icon className="text-primary" />
                          <p className="title text-base font-medium">
                            {topic.name}
                          </p>
                        </div>
                        <p className="description text-left mt-4 text-sm">
                          {topic.description}
                        </p>
                      </div>
                    </Link>
                  </Card>
                )
              })}
            </div>
          }
        />
      </main>
      <Footer />
    </>
  )
}
