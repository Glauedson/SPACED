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
  const [mainMediaLoaded, setMainMediaLoaded] = useState(false)
  const [previousImagesLoaded, setPreviousImagesLoaded] = useState([])
  const [titleLoaded, setTitleLoaded] = useState(false)
  const [explanationLoaded, setExplanationLoaded] = useState(false)

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

  async function fetchAPOD(date = "") {
    try {
      setMainMediaLoaded(false)
      setTitleLoaded(false)
      setExplanationLoaded(false)
      setTranslatedTitle("")
      setTranslatedExplanation("")
      
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