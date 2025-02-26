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
    const valorNormalizado = valor % 1;

    if (valorNormalizado >= 0 && valorNormalizado < 0.025) return "Lua Nova";
    if (valorNormalizado >= 0.025 && valorNormalizado < 0.235) return "Lua Crescente";
    if (valorNormalizado >= 0.235 && valorNormalizado < 0.265) return "Quarto Crescente";
    if (valorNormalizado >= 0.265 && valorNormalizado < 0.475) return "Gibosa Crescente";
    if (valorNormalizado >= 0.475 && valorNormalizado < 0.525) return "Lua Cheia";
    if (valorNormalizado >= 0.525 && valorNormalizado < 0.735) return "Gibosa Minguante";
    if (valorNormalizado >= 0.735 && valorNormalizado < 0.765) return "Quarto Minguante";
    return "Lua Minguante"; 
  };

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
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    return `${dia}/${mes}`;
  };

  const ehHojeOuDepois = (dataString) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
  
    const dataComparar = new Date(dataString);
    dataComparar.setHours(0, 0, 0, 0);
  
    return dataComparar > hoje || (dataComparar.getTime() === hoje.getTime());
  };
  

  useEffect(() => {
    const fetchMoonPhases = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&daily=moonphase&timezone=America/Sao_Paulo&forecast_days=10"
        );
  
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
  
        const data = await response.json();
        
        if (data && data.daily && data.daily.moonphase && data.daily.time) {
          const fasesDaLuaProcessadas = data.daily.moonphase
            .map((fase, index) => {
              const dataString = data.daily.time[index];
              return {
                date: dataString,
                phase: mapearFaseLua(fase),
                original: fase 
              };
            })
            .filter(item => ehHojeOuDepois(item.date)) 
            .slice(0, 8); 
          
          setPrevisao(fasesDaLuaProcessadas);
        } else {
          gerarDadosExemplo();
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        gerarDadosExemplo();
      }
    };
    
    const gerarDadosExemplo = () => {
      const hoje = new Date();
      const dadosExemplo = [];
      
      for (let i = 0; i < 8; i++) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() + i);
        const dataFormatada = data.toISOString().split('T')[0];
        
        let fase;
        if (i === 0) {
          fase = "Lua Minguante";
        } else {
          const fases = ["Lua Nova", "Lua Crescente", "Quarto Crescente", "Gibosa Crescente", 
                        "Lua Cheia", "Gibosa Minguante", "Quarto Minguante", "Lua Minguante"];
          const indiceInicial = 7; 
          fase = fases[(indiceInicial + i) % 8];
        }
        
        dadosExemplo.push({
          date: dataFormatada,
          phase: fase,
          original: null
        });
      }
      
      setPrevisao(dadosExemplo);
    };
  
    fetchMoonPhases();
  }, []);

  return (
    <>
      {previsao ? (
        <div className="caixaDiasSemana">
          {previsao.map((dia, index) => {
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
