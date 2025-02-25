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

  const fasesDaLua = {
    0: "Lua Nova",
    1: "Lua Crescente",
    2: "Quarto Crescente",
    3: "Gibosa Crescente",
    4: "Lua Cheia",
    5: "Gibosa Minguante",
    6: "Quarto Minguante",
    7: "Lua Minguante"
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
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&daily=moonphase&timezone=America/Sao_Paulo"
        );
  
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`)
        }
  
        const data = await response.json()
        
        if (data && data.daily && data.daily.moonphase) {
          const fasesDaLuaProcessadas = data.daily.moonphase.map((fase, index) => {
            const dataFormatada = data.daily.time[index]
            return {
              date: dataFormatada,
              phase: fasesDaLua[Math.round(fase) % 8] || "Lua Nova"
            }
          })
          
          setPrevisao(fasesDaLuaProcessadas);
        } else if (data && data.daily && data.daily.time) {

          const datas = data.daily.time;
          const fasesDaLuaProcessadas = datas.map(data => {
            const faseIndex = Math.floor(Math.random() * 8)
            const faseNome = fasesDaLua[faseIndex]
            return {
              date: data,
              phase: faseNome
            }
          })
          
          setPrevisao(fasesDaLuaProcessadas)
        }
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
        
        const faseIndex = i % 8;
        const faseNome = fasesDaLua[faseIndex];
        
        dadosExemplo.push({
          date: dataFormatada,
          phase: faseNome
        })
      }
      
      setPrevisao(dadosExemplo)
    }
  
    fetchMoonPhases()
  },)

  return (
    <>
      {previsao ? (
        <div className="caixaDiasSemana">
          {previsao.slice(0, 8).map((dia, index) => { 
            const faseLua = dia.phase;
            const imagemFaseLua = fasesParaImagens[faseLua];
            const dataFormatada = formatarData(dia.date);

            return (
              <motion.div
                key={index}
                className="caixaDia"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  className="caixaDiaFoto"
                  style={{
                    backgroundImage: `url(${imagemFaseLua || ''})`,
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="sombra"></div>
                <div className="dia">
                  <p>{dataFormatada}</p>
                </div>
                <div className="faseLua">
                  <p>{faseLua}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  )
}

export default MoonForecast