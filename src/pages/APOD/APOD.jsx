import { useEffect, useState } from "react"
import styles from "./Apod.module.css"
import Header from "../components/header/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faDownload } from "@fortawesome/free-solid-svg-icons"
import { motion } from "framer-motion"

const API_KEY = "53VVGWPFSAqtWUBMXGKDgF6ZOJuCWEfdfLyzve0k"
const API_URL = "https://api.nasa.gov/planetary/apod"

const MY_MEMORY_API_URL = "https://api.mymemory.translated.net/get"

function formatDate(dateStr) {
  if (!dateStr) return "--"
  const date = new Date(dateStr + "T00:00:00Z")
  const day = date.getUTCDate().toString().padStart(2, "0")
  const month = date.toLocaleString("en", { month: "short", timeZone: "UTC" }).toUpperCase()
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
  const [mainImageLoaded, setMainImageLoaded] = useState(false)
  const [previousImagesLoaded, setPreviousImagesLoaded] = useState([])
  const [titleLoaded, setTitleLoaded] = useState(false)
  const [explanationLoaded, setExplanationLoaded] = useState(false)

  async function fetchAPOD(date = "") {
    try {
      setMainImageLoaded(false)
      setTitleLoaded(false)
      setExplanationLoaded(false)
      setTranslatedTitle("")
      setTranslatedExplanation("")
      
      const response = await fetch(`${API_URL}?api_key=${API_KEY}&date=${date}`)
      const data = await response.json()
      setApod(data)

      const img = new Image()
      img.onload = () => setMainImageLoaded(true)
      img.onerror = () => setMainImageLoaded(true)
      img.src = data.hdurl || data.url || ""

      if (data.title) {
        const translatedTitle = await translateText(data.title);
        setTranslatedTitle(translatedTitle);
        setTitleLoaded(true);
      }
      if (data.explanation) {
        const translatedExplanation = await translateText(data.explanation);
        setTranslatedExplanation(translatedExplanation);
        setExplanationLoaded(true);
      }

    } catch (error) {
      console.error("Erro ao buscar APOD:", error)
      setMainImageLoaded(true)
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
        setPreviousApods(filteredResults)
        setPreviousImagesLoaded(new Array(filteredResults.length).fill(false))

        filteredResults.forEach((apod, index) => {
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

  return (
    <>
      <Header />
      <main>
        <div className={styles.conteinerInicial}>
          <div className={styles.fotoData}>
            <div 
              className={`${styles.foto} ${!mainImageLoaded ? styles.loading : ""}`} 
              style={{ backgroundImage: mainImageLoaded && apod?.hdurl ? `url(${apod.hdurl})` : "none" }}
            ></div>
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

            <div className={styles.AvisoDadosErro}>
                <p>
                   Se os textos estiverem em inglês, peço desculpas pelo erro. A API utilizada para a tradução dos dados possui um limite diário de traduções</p>
            </div>

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
                BAIXAR IMAGEM
              </motion.p>
              <motion.div 
                className={styles.baixarImagem}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <button onClick={() => window.open(apod?.hdurl, "_blank")}>
                  <FontAwesomeIcon icon={faDownload} /> HD
                </button>
                <button onClick={() => window.open(apod?.url, "_blank")}>
                  <FontAwesomeIcon icon={faDownload} /> SD
                </button>
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
                    <div 
                      className={`${styles.DiasFoto} ${!previousImagesLoaded[index] ? styles.loading : ""}`} 
                      style={{ backgroundImage: previousImagesLoaded[index] && prev?.url ? `url(${prev.url})` : "none" }}
                    ></div>
                    <div className={styles.diaAnteriorInfo}>
                      <p>{translatedPreviousTitles[index] || "Carregando..."}</p>
                      <p>
                        <FontAwesomeIcon icon={faCalendarDays} /> {formatDate(prev?.date)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default APOD
