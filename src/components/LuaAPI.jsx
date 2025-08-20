import { useEffect, useState } from "react"

const fasesLua = {
  NEW_MOON: "LUA NOVA",
  WAXING_CRESCENT: "LUA CRESCENTE",
  FIRST_QUARTER: "QUARTO CRESCENTE",
  WAXING_GIBBOUS: "GIBOSA CRESCENTE",
  FULL: "LUA CHEIA",
  WANING_GIBBOUS: "GIBOSA MINGUANTE",
  LAST_QUARTER: "QUARTO MINGUANTE",
  WANING_CRESCENT: "LUA MINGUANTE"
}

const LuaAPI = () => {
  const [faseLua, setFaseLua] = useState(null)

  useEffect(() => {
    const chaveAPI = 'd9289baed5b844fc836349e02a1172bb'

    fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${chaveAPI}`)
      .then((res) => res.json())
      .then((data) => {

        if (data && data.moon_phase) {
          setFaseLua(fasesLua[data.moon_phase] || "Desconhecida")
        } else {
          setFaseLua("Dados da lua não encontrados")
        }
      })
      .catch((error) => console.error("Erro ao buscar a fase da lua:", error))
  }, [])

  return (
      <p>{faseLua || "Carregando..."}</p>
  )
}

export default LuaAPI
