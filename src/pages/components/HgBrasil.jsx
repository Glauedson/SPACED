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

const HGBrasil = () => {
  const [previsao, setPrevisao] = useState(null)

  const fasesDaLua = {
    "new": "Lua Nova",
    "waxing_crescent": "Lua Crescente",
    "first_quarter": "Quarto Crescente",
    "waxing_gibbous": "Gibosa Crescente",
    "full": "Lua Cheia",
    "waning_gibbous": "Gibosa Minguante",
    "last_quarter": "Quarto Minguante",
    "waning_crescent": "Lua Minguante"
  }

  const imagensDaLua = {
    "new": newMoon,
    "waxing_crescent": waxingCrescent,
    "first_quarter": firstQuarter,
    "waxing_gibbous": waxingGibbous,
    "full": fullMoon,
    "waning_gibbous": waningGibbous,
    "last_quarter": lastQuarter,
    "waning_crescent": waningCrescent
  }

  useEffect(() => {
    fetch('https://api.hgbrasil.com/weather?format=json-cors')
      .then(res => res.json())
      .then(data => {
        if (data && data.results && data.results.forecast) {
          const dadosPrevisao = data.results.forecast
          setPrevisao(dadosPrevisao)
        }
      })
      .catch(error => console.error('Erro ao buscar dados:', error))
  }, [])

  return (
    <>
      {previsao ? (
        <div className="caixaDiasSemana">
          {previsao.map((dia, index) => {
            const faseLua = fasesDaLua[dia.moon_phase] || 'N/A'
            const imagemFaseLua = dia.moon_phase

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
                    backgroundImage: `url(${imagensDaLua[imagemFaseLua] || ''})`,
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="sombra"></div>
                <div className="dia">
                  <p>{dia.weekday}</p>
                  <p>{dia.date}</p>
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

export default HGBrasil
