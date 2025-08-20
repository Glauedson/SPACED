import { useEffect, useState } from "react"
import styles from "./Apod.module.css"
import Header from "../../components/header/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faDownload } from "@fortawesome/free-solid-svg-icons"
import { motion } from "framer-motion"
import profile from "../../assets/images/profile.png"

const API_KEY = "53VVGWPFSAqtWUBMXGKDgF6ZOJuCWEfdfLyzve0k"
const API_URL = "https://api.nasa.gov/planetary/apod"

const MY_MEMORY_API_URL = "https://api.mymemory.translated.net/get"

// Dados dos famosos com APOD fictício
const FAMOSOS_DATA = [
  {
    nome: "Glauedson Carlos",
    foto: "https://avatars.githubusercontent.com/u/181038586?v=4",
    data: "2004-09-18",
    ocupacao: "Desenvolvedor",
    apodData: {
      date: "2004-09-18",
      title: "M55: Aglomerado Estelar Globular",
      explanation: "A entrada de número 55 no famoso catálogo de Charles Messier é M55, um grande e deslumbrante aglomerado globular que reúne cerca de 100 mil estrelas. Localizado a aproximadamente 20 mil anos luz de distância, na constelação de Sagitário, esse aglomerado ocupa, no céu visto da Terra, quase dois terços do tamanho da Lua cheia. Aglomerados globulares como o M55 orbitam o halo da nossa galáxia, a Via Láctea, formando populações estelares gravitacionalmente unidas. Essas estrelas são bem mais antigas do que aquelas encontradas no disco galáctico, onde estão, por exemplo, o Sol e os planetas do nosso Sistema Solar. Astrônomos que estudam em detalhe os aglomerados globulares conseguem medir com precisão suas idades e distâncias. Esses dados são essenciais para estabelecer limites confiáveis sobre a idade do próprio Universo, afinal, ele precisa ser mais antigo do que as estrelas que abriga, e também ajudam a construir a chamada “escada de distâncias” da astronomia, que permite calcular quão longe estão os objetos celestes. Essa impressionante imagem em três cores foi feita com filtros astronômicos especiais (BVI) e revela uma região de cerca de 100 anos luz de diâmetro dentro do aglomerado M55.",
      media_type: "image",
      url: "https://apod.nasa.gov/apod/image/0409/m55_mochejska_full.jpg",
      hdurl: "https://apod.nasa.gov/apod/image/0409/m55_mochejska_full.jpg",
      copyright: "B.J. Mochejska (CfA)"
    }
  },
  {
    nome: "Billie Eilish",
    foto: "https://www.otempo.com.br/content/dam/otempo/editorias/entretenimento/filmes-e-series/2023/7/entretenimento-billie-eilish-anuncia-musica-para-trilha-de-barbie-1708768026.jpeg",
    data: "2001-12-18",
    ocupacao: "Cantora",
    apodData: {
      date: "2001-12-18",
      title: "Sharpless 212 em Hidrogênio e Enxofre ",
      explanation: "Onde se formam as estrelas mais massivas do universo? As evidências observacionais indicam que elas costumam surgir nas bordas de aglomerados abertos em formação — como é o caso de Sharpless 212, mostrado nesta imagem. No centro da foto, vemos estrelas jovens e massivas que pertencem a esse aglomerado aberto. A luz intensa que elas emitem ioniza os átomos de hidrogênio ao redor, criando uma região HII. Quando esses átomos de hidrogênio recuperam seus elétrons, liberam uma luz avermelhada, visível na imagem. Além do hidrogênio, Sharpless 212 também contém pequenas quantidades de poeira cósmica e elementos mais pesados, como o enxofre. A poeira absorve eficientemente a luz, enquanto o enxofre contribui com emissões destacadas em tons azulados. Um dos aspectos mais impressionantes são os contornos bem definidos que separam o gás ionizado do material neutro ao redor, nas bordas da região HII. Sharpless 212 tem cerca de 20 anos luz de extensão e está localizada a aproximadamente 25 mil anos luz da Terra.",
      media_type: "image",
      url: "https://apod.nasa.gov/apod/image/0112/sh212_ohp.jpg",
      hdurl: "https://apod.nasa.gov/apod/image/0112/sh212_ohp.jpg",
      copyright: "Robert Nemiroff (MTU) & Jerry Bonnell (USRA)"
    }
  },
  {
    nome: "Lil Nas X",
    foto: "https://laboratoriopop.com.br/wp-content/uploads/2022/11/500x500-1.jpg",
    data: "1999-04-09",
    ocupacao: "Cantor",
    apodData: {
      date: "1999-04-09",
      title: "WR 104: A Estrela Cata-vento",
      explanation: "Como um irrigador cósmico, jatos de poeira que se espalham a partir de um sistema estelar em rotação formam um padrão em espiral nesta imagem em infravermelho com cores artificiais. Os astrônomos descobriram esse cenário surpreendente ao observar a estrela brilhante WR 104, do tipo Wolf-Rayet, usando um interferômetro avançado e o telescópio Keck I de 10 metros. Estrelas Wolf-Rayet são consideradas objetos extremamente massivos que estão prestes a explodir em uma supernova catastrófica. Elas se tornam tão quentes e luminosas que sua intensa radiação começa a expulsar matéria para o espaço em ventos estelares violentos. O curioso é que essa mesma luz deveria ser forte o bastante para destruir qualquer grão de poeira ao redor! Uma possível explicação para essa “poeira sobrevivente” é a presença de uma estrela companheira escondida na região central brilhante. A interação entre os ventos das duas estrelas criaria uma zona protegida, estreita, onde a poeira pode se formar sem ser imediatamente destruída pela luz intensa da WR 104. À medida que esse sistema binário gira, a poeira que consegue sobreviver é lançada em uma espiral elegante que se afasta do centro, como uma assinatura cósmica em forma de cata-vento.",
      media_type: "image",
      url: "https://apod.nasa.gov/apod/image/9904/wr104_sslkeck.jpg",
      hdurl: "https://apod.nasa.gov/apod/image/9904/wr104_sslkeck.jpg",
      copyright: "U.C. Berkeley Space Sciences Laboratory"
    }
  },
  {
    nome: "Zendaya",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOdqd20FlxRXuSt1JoashqGGuVhLbEJ_KgYQ&s",
    data: "1996-09-01",
    ocupacao: "Atriz",
    apodData: {
      date: "1996-09-01",
      title: "VLT: O Novo Maior Telescópio Óptico do Mundo",
      explanation: "Qual é o maior telescópio do mundo? No campo da astronomia óptica, esse título pertenceu por muito tempo ao Hale, com seu espelho de 200 polegadas, e atualmente está com os telescópios Keck, no Havaí. Mas um novo gigante está surgindo. Chamado de Very Large Telescope (VLT), o Observatório Europeu do Sul (ESO) está construindo no Chile quatro espelhos de 8,2 metros de diâmetro cada, que funcionarão em conjunto como um único telescópio com capacidade equivalente a um espelho de mais de 16 metros. O primeiro desses telescópios deve ficar pronto em 1997, e todos os quatro devem estar operando juntos até o ano 2000. O VLT usará tecnologia de ótica ativa, permitindo uma resolução inferior a um segundo de arco. Essa precisão, combinada com sua imensa capacidade de captar luz, permitirá aos astrônomos observar objetos extremamente tênues, tanto na nossa galáxia quanto no universo primordial.",
      media_type: "image",
      url: "https://apod.nasa.gov/apod/image/vlt_eso.gif",
      hdurl: "https://apod.nasa.gov/apod/image/vlt_eso.gif",
      copyright: "European Southern Observatory"
    }
  },
  {
    nome: "Howiee",
    foto: `${profile}`,
    data: "2004-09-23",
    ocupacao: "Editora / Influencer",
    apodData: {
      date: "2004-09-23",
      title: "A Noite Estrelada de La Silla",
      explanation: "Em noites limpas e sem luar, o céu sobre o observatório astronômico de La Silla, em alta altitude, ainda se enche de estrelas com intensidade impressionante. Aproveitando uma visita recente ao primeiro observatório construído pelo ESO (Observatório Europeu do Sul) no topo de uma montanha no Chile, o engenheiro de software Nico Housen registrou essa vista espetacular do céu. Na imagem, é possível ver claramente uma faixa de estrelas tênues e nuvens escuras de poeira interestelar atravessando o plano da Via Láctea — um espetáculo difícil de observar em regiões com poluição luminosa. Em destaque no primeiro plano está a antena altamente polida do Telescópio Submilimétrico Sueco-ESO, com 15 metros de diâmetro (hoje fora de operação). Ao fundo, silhuetada pela luz das estrelas, aparece a cúpula de um dos grandes instrumentos ópticos de La Silla: o telescópio de 3,6 metros. De forma impressionante, a superfície espelhada da antena reflete a paisagem atrás do fotógrafo, criando uma cena invertida em que o horizonte escuro parece suspenso acima da Via Láctea e do céu estrelado.",
      media_type: "image",
      url: "https://apod.nasa.gov/apod/image/0409/LaSillaMilkyWay_housen_c1.jpg",
      hdurl: "https://apod.nasa.gov/apod/image/0409/LaSillaMilkyWay_housen_c1.jpg",
      copyright: "European Southern Observatory"
    }
  }
]

function formatDate(dateStr) {
  if (!dateStr) return "--"
  const date = new Date(dateStr + "T00:00:00Z")
  const day = date.getUTCDate().toString().padStart(2, "0")
  const month = date.toLocaleString("pt-br", { month: "short", timeZone: "UTC" }).toUpperCase()
  const year = date.getUTCFullYear()
  return `${day} ${month} ${year}`
}

async function translateText(text) {
  const maxLength = 500
  const chunks = []

  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.slice(i, i + maxLength))
  }

  const translations = []
  
  for (const chunk of chunks) {
    const response = await fetch(`${MY_MEMORY_API_URL}?q=${encodeURIComponent(chunk)}&langpair=en|pt`)
    const data = await response.json()

    if (data.responseStatus !== 200 || data.responseData.translatedText.includes("LIMIT REACHED")) {
      return text
    }

    translations.push(data.responseData.translatedText)
  }

  return translations.join(" ")
}

function APOD() {
  const [apod, setApod] = useState(null)
  const [previousApods, setPreviousApods] = useState([])
  const [translatedTitle, setTranslatedTitle] = useState("")
  const [translatedExplanation, setTranslatedExplanation] = useState("")
  const [translatedPreviousTitles, setTranslatedPreviousTitles] = useState([])
  const [mainMediaLoaded, setMainMediaLoaded] = useState(false)
  const [previousImagesLoaded, setPreviousImagesLoaded] = useState([])
  const [titleLoaded, setTitleLoaded] = useState(false)
  const [explanationLoaded, setExplanationLoaded] = useState(false)
  const [isFromFamosos, setIsFromFamosos] = useState(false) // Flag para saber se veio dos famosos

  const getYouTubeThumbnail = (url) => {
    if (!url) return null
    
    let videoId = ''
    if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0]
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1]
    }
    
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/0.jpg`
    }
    return null
  }

  // Função para carregar dados dos famosos
  function loadFamososData(famosoData) {
    setMainMediaLoaded(false)
    setTitleLoaded(false)
    setExplanationLoaded(false)
    setIsFromFamosos(true)
    
    // Define os dados do APOD
    setApod(famosoData.apodData)
    
    // Como os dados já estão em português, não precisa traduzir
    setTranslatedTitle(famosoData.apodData.title)
    setTranslatedExplanation(famosoData.apodData.explanation)
    
    // Simula o carregamento da imagem
    if (famosoData.apodData.media_type === 'image') {
      const img = new Image()
      img.onload = () => {
        setMainMediaLoaded(true)
        setTitleLoaded(true)
        setExplanationLoaded(true)
      }
      img.onerror = () => {
        setMainMediaLoaded(true)
        setTitleLoaded(true)
        setExplanationLoaded(true)
      }
      img.src = famosoData.apodData.hdurl || famosoData.apodData.url || ""
    } else {
      setMainMediaLoaded(true)
      setTitleLoaded(true)
      setExplanationLoaded(true)
    }
  }

  async function fetchAPOD(date = "") {
    try {
      setMainMediaLoaded(false)
      setTitleLoaded(false)
      setExplanationLoaded(false)
      setTranslatedTitle("")
      setTranslatedExplanation("")
      setIsFromFamosos(false) // Reset da flag
      
      const response = await fetch(`${API_URL}?api_key=${API_KEY}&date=${date}`)
      const data = await response.json()
      
      if (data.media_type === 'video' && data.url && data.url.includes('youtube')) {
        data.thumbnail_url = getYouTubeThumbnail(data.url) || data.thumbnail_url
      }
      
      setApod(data)

      if (data.media_type === 'image') {
        const img = new Image()
        img.onload = () => setMainMediaLoaded(true)
        img.onerror = () => setMainMediaLoaded(true)
        img.src = data.hdurl || data.url || ""
      } else {
        setMainMediaLoaded(true)
      }

      if (data.title) {
        const translatedTitle = await translateText(data.title)
        setTranslatedTitle(translatedTitle)
        setTitleLoaded(true)
      }
      if (data.explanation) {
        const translatedExplanation = await translateText(data.explanation)
        setTranslatedExplanation(translatedExplanation)
        setExplanationLoaded(true)
      }

    } catch (error) {
      console.error("Erro ao buscar APOD:", error)
      setMainMediaLoaded(true)
      setTitleLoaded(true)
      setExplanationLoaded(true)
    }
  }

  useEffect(() => {
    fetchAPOD()

    async function fetchPreviousAPODs() {
      const now = new Date()
      now.setUTCHours(0, 0, 0, 0)
    
      const today = new Date(now)
      if (now.getUTCHours() < 4) {
        today.setUTCDate(today.getUTCDate() - 1)
      }
    
      const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today)
        date.setUTCDate(date.getUTCDate() - i)
        return date.toISOString().split("T")[0]
      })
    
      const requests = dates.map(date =>
        fetch(`${API_URL}?api_key=${API_KEY}&date=${date}`)
          .then(res => res.json())
          .catch(() => null)
      )
    
      try {
        const results = await Promise.all(requests)
        const filteredResults = results.filter(apod => apod)
        
        filteredResults.forEach(item => {
          if (item && item.media_type === 'video' && item.url && item.url.includes('youtube')) {
            item.thumbnail_url = getYouTubeThumbnail(item.url) || item.thumbnail_url
          }
        })
        
        setPreviousApods(filteredResults)
        setPreviousImagesLoaded(new Array(filteredResults.length).fill(false))

        filteredResults.forEach((apod, index) => {
          if (apod?.media_type === 'image') {
            const img = new Image()
            img.onload = () => {
              setPreviousImagesLoaded(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
            img.onerror = () => {
              setPreviousImagesLoaded(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
            img.src = apod?.url || ""
          } else if (apod?.media_type === 'video' && apod?.thumbnail_url) {
            const img = new Image()
            img.onload = () => {
              setPreviousImagesLoaded(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
            img.onerror = () => {
              setPreviousImagesLoaded(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
            img.src = apod.thumbnail_url
          } else {
            setPreviousImagesLoaded(prev => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        })

        const translatedTitles = await Promise.all(
          filteredResults.map((apod) => apod?.title ? translateText(apod.title) : "")
        )
        setTranslatedPreviousTitles(translatedTitles)

      } catch (error) {
        console.error("Erro ao buscar APODs anteriores:", error)
      }
    }

    fetchPreviousAPODs()
  }, [])

  const renderMainMedia = () => {
    if (!apod) {
      return <div className={`${styles.foto} ${styles.loading}`}></div>
    }

    if (apod.media_type === 'video') {
      if (apod.url && apod.url.includes('youtube.com') || apod.url.includes('youtu.be')) {
        let embedUrl = apod.url
        if (apod.url.includes('watch?v=')) {
          const videoId = apod.url.split('watch?v=')[1].split('&')[0]
          embedUrl = `https://www.youtube.com/embed/${videoId}`
        } else if (apod.url.includes('youtu.be')) {
          const videoId = apod.url.split('youtu.be/')[1]
          embedUrl = `https://www.youtube.com/embed/${videoId}`
        }
        
        return (
          <div className={styles.videoContainer}>
            <iframe 
              src={embedUrl} 
              title={apod.title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className={styles.videoFrame}
            />
          </div>
        )
      } else {
        return (
          <div className={styles.videoContainer}>
            <video 
              controls 
              className={styles.videoFrame}
              poster={apod.thumbnail_url}
            >
              <source src={apod.url} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
        )
      }
    } else {
      return (
        <div 
          className={`${styles.foto} ${!mainMediaLoaded ? styles.loading : ""}`} 
          style={{ backgroundImage: mainMediaLoaded && apod?.hdurl ? `url(${apod.hdurl})` : "none" }}
        ></div>
      )
    }
  }

  const renderPreviousMedia = (prev, index) => {
    if (!prev) {
      return <div className={`${styles.DiasFoto} ${styles.loading}`}></div>
    }

    if (prev.media_type === 'video') {
      const thumbnailUrl = prev.thumbnail_url || ''
      
      return (
        <div 
          className={`${styles.DiasFoto} ${!previousImagesLoaded[index] ? styles.loading : ""} ${styles.videoThumbnail}`} 
          style={{ backgroundImage: previousImagesLoaded[index] && thumbnailUrl ? `url(${thumbnailUrl})` : "none" }}
        >
          <div className={styles.playIcon}>▶</div>
        </div>
      )
    } else {
      return (
        <div 
          className={`${styles.DiasFoto} ${!previousImagesLoaded[index] ? styles.loading : ""}`} 
          style={{ backgroundImage: previousImagesLoaded[index] && prev?.url ? `url(${prev.url})` : "none" }}
        ></div>
      )
    }
  }

  const renderDownloadButtons = () => {
    if (!apod) return null
    
    if (apod.media_type === 'image') {
      return (
        <div className={styles.baixarImagem}>
          <button onClick={() => window.open(apod?.hdurl, "_blank")}>
            <FontAwesomeIcon icon={faDownload} /> HD
          </button>
          <button onClick={() => window.open(apod?.url, "_blank")}>
            <FontAwesomeIcon icon={faDownload} /> SD
          </button>
        </div>
      )
    } else {
      return (
        <div className={styles.baixarImagem}>
          <button onClick={() => window.open(apod?.url, "_blank")}>
            <FontAwesomeIcon icon={faDownload} /> Vídeo Original
          </button>
        </div>
      )
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className={styles.conteinerInicial}>
          <div className={styles.fotoData}>
            {renderMainMedia()}
            <div className={styles.infoFoto}>
              <motion.div 
                className={styles.data}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p>DATA</p>
                <h3>{apod ? formatDate(apod.date) : "--"}</h3>
              </motion.div>
              <motion.div 
                className={styles.autor}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p>AUTOR</p>
                <h3>{apod?.copyright || "NASA"}</h3>
              </motion.div>
            </div>

            {!isFromFamosos && (
              <div className={styles.AvisoDadosErro}>
                <p>
                   Se os textos estiverem em inglês, peço desculpas pelo erro. A API utilizada para a tradução dos dados possui um limite diário de traduções
                </p>
              </div>
            )}
          </div>

          <div className={styles.informacoes}>
            <div className={styles.infoConteudo}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {titleLoaded && translatedTitle ? (
                  <h1>{translatedTitle}</h1>
                ) : (
                  <h1 className={`${styles.skeletonTitle} ${styles.loadingText}`}></h1>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {explanationLoaded && translatedExplanation ? (
                  <p>{translatedExplanation}</p>
                ) : (
                  <div className={styles.skeletonText}>
                    <div className={`${styles.skeletonLine} ${styles.loadingText}`}></div>
                    <div className={`${styles.skeletonLine} ${styles.loadingText}`}></div>
                    <div className={`${styles.skeletonLine} ${styles.loadingText}`}></div>
                    <div className={`${styles.skeletonLine} ${styles.loadingText}`}></div>
                    <div className={`${styles.skeletonLine} ${styles.loadingText}`}></div>
                    <div className={`${styles.skeletonLine} ${styles.loadingText}`}></div>
                    <div className={`${styles.skeletonLine} ${styles.loadingText} ${styles.skeletonLineShorter}`}></div>
                  </div>
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {apod?.media_type === 'image' ? 'BAIXAR IMAGEM' : 'ACESSAR VÍDEO'}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {renderDownloadButtons()}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                DIAS ANTERIORES
              </motion.p>
              <motion.div 
                className={styles.HubDias}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {previousApods.map((prev, index) => (
                  <motion.div
                    key={index}
                    className={styles.diaAnterior}
                    onClick={() => fetchAPOD(prev.date)}
                    style={{ cursor: "pointer" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    {renderPreviousMedia(prev, index)}
                    <div className={styles.diaAnteriorInfo}>
                      <p className={styles.tituloScrows}>{translatedPreviousTitles[index] || "Carregando..."}</p>
                      <p>
                        <FontAwesomeIcon icon={faCalendarDays} /> {formatDate(prev?.date)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className={styles.Famosos}>
                <h3>APOD DOS FAMOSOS</h3>
                {FAMOSOS_DATA.map((famoso, index) => (
                  <div 
                    key={index}
                    className={styles.FamososCard}
                    onClick={() => loadFamososData(famoso)}
                  >
                    <div className={styles.fotosFamosos}>
                      <div className={styles.fotoCapa}
                      style={{backgroundImage: `url(${famoso.foto})`}}
                      ></div>

                      <div className={styles.fotoCapa}
                      style={{backgroundImage: `url(${famoso.apodData.url})`}}
                      ></div>
                    </div>
                    <div className={styles.famosoInfo}>
                      <h4 className={styles.famosoNome}>{famoso.nome}</h4>
                      <p className={styles.famosoOcupacao}>{famoso.ocupacao.toUpperCase()}</p>
                      <p className={styles.famosoApod}>{famoso.apodData.title}</p>
                      <p><FontAwesomeIcon icon={faCalendarDays} /> {formatDate(famoso.data)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default APOD