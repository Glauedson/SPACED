import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import newMoon from '../../assets/images/fases-da-lua/NEW.png'
import waxingCrescent from '../../assets/images/fases-da-lua/WAXING_CRESCENT.png'
import firstQuarter from '../../assets/images/fases-da-lua/FIRST_QUARTER.png'
import waxingGibbous from '../../assets/images/fases-da-lua/WAXING_GIBBOUS.png'
import fullMoon from '../../assets/images/fases-da-lua/FULL.png'
import waningGibbous from '../../assets/images/fases-da-lua/WANING_GIBBOUS.png'
import lastQuarter from '../../assets/images/fases-da-lua/LAST_QUARTER.png'
import waningCrescent from '../../assets/images/fases-da-lua/WANING_CRESCENT.png'

const MoonForecast = () => {
  const [previsao, setPrevisao] = useState(null)

  const mapearFaseLua = (valor) => {
    const valorNormalizado = valor % 1
    if (valorNormalizado >= 0 && valorNormalizado < 0.025) return "Lua Nova"
    if (valorNormalizado >= 0.025 && valorNormalizado < 0.235) return "Lua Crescente"
    if (valorNormalizado >= 0.235 && valorNormalizado < 0.265) return "Quarto Crescente"
    if (valorNormalizado >= 0.265 && valorNormalizado < 0.475) return "Gibosa Crescente"
    if (valorNormalizado >= 0.475 && valorNormalizado < 0.525) return "Lua Cheia"
    if (valorNormalizado >= 0.525 && valorNormalizado < 0.735) return "Gibosa Minguante"
    if (valorNormalizado >= 0.735 && valorNormalizado < 0.765) return "Quarto Minguante"
    return "Lua Minguante"
  }

  const fasesParaImagens = {
    "Lua Nova": newMoon,
    "Lua Crescente": waxingCrescent,
    "Quarto Crescente": firstQuarter,
    "Gibosa Crescente": waxingGibbous,
    "Lua Cheia": fullMoon,
    "Gibosa Minguante": waningGibbous,
    "Quarto Minguante": lastQuarter,
    "Lua Minguante": waningCrescent
  }

  const formatarData = (dataString) => {
    const data = new Date(dataString)
    const dia = data.getDate().toString().padStart(2, '0')
    const mes = (data.getMonth() + 1).toString().padStart(2, '0')
    return `${dia}/${mes}`
  }
  
  useEffect(() => {
    const fetchMoonPhases = async () => {
      try {
        const geoResponse = await fetch(`https://api.ipgeolocation.io/astronomy?apiKey=SEU_API_KEY`)
        if (!geoResponse.ok) throw new Error(`Erro na geolocalização: ${geoResponse.status}`)
        const geoData = await geoResponse.json()
        const latitude = geoData.location.latitude
        const longitude = geoData.location.longitude

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=moonphase&timezone=auto&forecast_days=8`
        )

        if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`)
        const data = await response.json()
        
        if (data?.daily?.moonphase && data?.daily?.time) {
          const fasesDaLuaProcessadas = data.daily.moonphase.map((fase, index) => ({
            date: data.daily.time[index],
            phase: mapearFaseLua(fase),
            original: fase 
          })).slice(0, 8)
          setPrevisao(fasesDaLuaProcessadas)
        } else gerarDadosExemplo()
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
        gerarDadosExemplo()
      }
    }
    
    const gerarDadosExemplo = () => {
      const hoje = new Date()
      const dadosExemplo = []
      
      for (let i = 0; i < 8; i++) {
        const data = new Date(hoje)
        data.setDate(hoje.getDate() + i)
        const dataFormatada = data.toISOString().split('T')[0]
        
        const fasesDisponiveis = ["Lua Nova", "Lua Crescente", "Quarto Crescente", 
                                  "Gibosa Crescente", "Lua Cheia", "Gibosa Minguante", 
                                  "Quarto Minguante", "Lua Minguante"]
        const faseAleatoria = fasesDisponiveis[(i + 1) % 8]
        
        dadosExemplo.push({ date: dataFormatada, phase: faseAleatoria, original: null })
      }
      setPrevisao(dadosExemplo)
    }
    fetchMoonPhases()
  }, [])

  return (
    <>
      {previsao ? (
        <div className="caixaDiasSemana">
          {previsao.map((dia, index) => (
            <motion.div
              key={index}
              className="caixaDia"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{once:true}}
            >
              <div
                className="caixaDiaFoto"
                style={{ backgroundImage: `url(${fasesParaImagens[dia.phase] || ''})`, backgroundPosition: 'center' }}
              ></div>
              <div className="sombra"></div>
              <div className="dia"><p>{formatarData(dia.date)}</p></div>
              <div className="faseLua"><p>{dia.phase}</p></div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  )
}

export default MoonForecast