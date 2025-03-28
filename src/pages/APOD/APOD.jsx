import { useEffect, useState } from "react"
import styles from "./Apod.module.css"
import Header from "../components/header/header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faDownload } from "@fortawesome/free-solid-svg-icons"

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

  async function fetchAPOD(date = "") {
    try {
      const response = await fetch(`${API_URL}?api_key=${API_KEY}&date=${date}`)
      const data = await response.json()
      setApod(data)

      if (data.title) {
        const translatedTitle = await translateText(data.title);
        setTranslatedTitle(translatedTitle);
      }
      if (data.explanation) {
        const translatedExplanation = await translateText(data.explanation);
        setTranslatedExplanation(translatedExplanation);
      }

    } catch (error) {
      console.error("Erro ao buscar APOD:", error)
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
        setPreviousApods(results.filter(apod => apod))

        const translatedTitles = await Promise.all(
          results.map((apod) => apod?.title ? translateText(apod.title) : "")
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
            <div className={styles.foto} style={{ backgroundImage: `url(${apod?.hdurl || ""})` }}></div>
            <div className={styles.infoFoto}>
              <div className={styles.data}>
                <p>DATA</p>
                <h3>{apod ? formatDate(apod.date) : "--"}</h3>
              </div>
              <div className={styles.autor}>
                <p>AUTOR</p>
                <h3>{apod?.copyright || "NASA"}</h3>
              </div>
            </div>
          </div>
          <div className={styles.informacoes}>
            <div className={styles.infoConteudo}>
              <h1>{translatedTitle || "Carregando..."}</h1>
              <p>{translatedExplanation || "Carregando..."}</p>
              <p>BAIXAR IMAGEM</p>
              <div className={styles.baixarImagem}>
                <button onClick={() => window.open(apod?.hdurl, "_blank")}>
                  <FontAwesomeIcon icon={faDownload} /> HD
                </button>
                <button onClick={() => window.open(apod?.url, "_blank")}>
                  <FontAwesomeIcon icon={faDownload} /> SD
                </button>
              </div>
              <p>DIAS ANTERIORES</p>
              <div className={styles.HubDias}>
                {previousApods.map((prev, index) => (
                  <div
                    key={index}
                    className={styles.diaAnterior}
                    onClick={() => fetchAPOD(prev.date)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.DiasFoto} style={{ backgroundImage: `url(${prev?.url || ""})` }}></div>
                    <div className={styles.diaAnteriorInfo}>
                      <p>{translatedPreviousTitles[index] || "Sem título"}</p>
                      <p>
                        <FontAwesomeIcon icon={faCalendarDays} /> {formatDate(prev?.date)}
                      </p>
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
