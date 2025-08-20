import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { moonPhases } from '../assets/assets.js' 

const MoonForecast = () => {
  const [previsao, setPrevisao] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const mapearFaseLua = (moonPhaseValue) => {
    // Pirate Weather retorna valores de 0 a 1:
    // 0.00 = Lua Nova
    // 0.25 = Quarto Crescente  
    // 0.50 = Lua Cheia
    // 0.75 = Quarto Minguante
    
    if (moonPhaseValue >= 0 && moonPhaseValue < 0.0625) return "Lua Nova"
    if (moonPhaseValue >= 0.0625 && moonPhaseValue < 0.1875) return "Lua Crescente"
    if (moonPhaseValue >= 0.1875 && moonPhaseValue < 0.3125) return "Quarto Crescente"
    if (moonPhaseValue >= 0.3125 && moonPhaseValue < 0.4375) return "Gibosa Crescente"
    if (moonPhaseValue >= 0.4375 && moonPhaseValue < 0.5625) return "Lua Cheia"
    if (moonPhaseValue >= 0.5625 && moonPhaseValue < 0.6875) return "Gibosa Minguante"
    if (moonPhaseValue >= 0.6875 && moonPhaseValue < 0.8125) return "Quarto Minguante"
    if (moonPhaseValue >= 0.8125 && moonPhaseValue < 0.9375) return "Lua Minguante"
    return "Lua Nova" // Para valores próximos a 1
  }

  const moonImagens = {
    "Lua Nova": moonPhases.new,
    "Lua Crescente": moonPhases.waxingCrescent,
    "Quarto Crescente": moonPhases.firstQuarter,
    "Gibosa Crescente": moonPhases.waxingGibbous,
    "Lua Cheia": moonPhases.full,
    "Gibosa Minguante": moonPhases.waningGibbous,
    "Quarto Minguante": moonPhases.lastQuarter,
    "Lua Minguante": moonPhases.waningCrescent
  }

  const formatarData = (timestamp) => {
    const data = new Date(timestamp * 1000)
    const dia = data.getDate().toString().padStart(2, '0')
    const mes = (data.getMonth() + 1).toString().padStart(2, '0')
    return `${dia}/${mes}`
  }
  
  useEffect(() => {
    const fetchMoonPhases = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const API_KEY = 'nLNI7TbJBFwJOTTm1rskrycmsxTtDffL'
        
        // Coordenadas (exemplo: Fortaleza, CE)
        const latitude = -3.7327
        const longitude = -38.5270
        
        // URL da API Pirate Weather 
        const url = `https://api.pirateweather.net/forecast/${API_KEY}/${latitude},${longitude}?units=si&lang=pt`
        
        const response = await fetch(url)
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('API Key inválida. Cadastre-se em https://pirateweather.net/')
          }
          throw new Error(`Erro na API: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (!data.daily || !data.daily.data) {
          throw new Error('Dados diários não encontrados na resposta')
        }
        
        // Mapear os dados da API para o formato esperado (próximos 7 dias)
        const dadosFormatados = data.daily.data.slice(0, 7).map((dia) => {
          const moonPhaseValue = dia.moonPhase || 0
          const faseLua = mapearFaseLua(moonPhaseValue)
          
          return {
            date: dia.time, 
            phase: faseLua,
            original: moonPhaseValue
          }
        })
        
        setPrevisao(dadosFormatados)
        
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error)
        setError(error.message)
        
        // Fallback: gerar dados de exemplo
        gerarDadosExemplo()
      } finally {
        setLoading(false)
      }
    }
    
    const gerarDadosExemplo = () => {
      const hoje = new Date()
      const dadosExemplo = []
      
      for (let i = 0; i < 7; i++) {
        const data = new Date(hoje)
        data.setDate(hoje.getDate() + i)
        
        const fasesDisponiveis = ["Lua Nova", "Lua Crescente", "Quarto Crescente", 
                                  "Gibosa Crescente", "Lua Cheia", "Gibosa Minguante", 
                                  "Quarto Minguante", "Lua Minguante"]
        const faseAleatoria = fasesDisponiveis[(i + Math.floor(hoje.getDate() % 8)) % 8]
        
        dadosExemplo.push({ 
          date: Math.floor(data.getTime() / 1000), 
          phase: faseAleatoria, 
          original: Math.random() 
        })
      }
      setPrevisao(dadosExemplo)
    }
    
    fetchMoonPhases()
  }, [])

  // Mostrar estado de loading
  if (loading) {
    return (
      <div className="caixaDiasSemana">
        <p>Carregando fases da lua...</p>
      </div>
    )
  }

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
                style={{ 
                  backgroundImage: `url(${moonImagens[dia.phase] || ''})`, 
                  backgroundPosition: 'center' 
                }}
              ></div>
              <div className="sombra"></div>
              <div className="dia"><p>{formatarData(dia.date)}</p></div>
              <div className="faseLua"><p>{dia.phase}</p></div>
              
            </motion.div>
          ))}
        </div>
      ) : (
        <p>Nenhum dado disponível</p>
      )}
    </>
  )
}

export default MoonForecast