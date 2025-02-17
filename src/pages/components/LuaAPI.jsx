import { useEffect, useState } from "react"

const fasesLua = {
  NEW: "Lua Nova",
  WAXING_CRESCENT: "Lua Crescente",
  FIRST_QUARTER: "Quarto Crescente",
  WAXING_GIBBOUS: "Gibosa Crescente",
  FULL: "Lua Cheia",
  WANING_GIBBOUS: "Gibosa Minguante",
  LAST_QUARTER: "Quarto Minguante",
  WANING_CRESCENT: "Lua Minguante"
}

const LuaAPI = () => {
  const [faseLua, setFaseLua] = useState(null)

  useEffect(() => {
    const chaveAPI = 'd9289baed5b844fc836349e02a1172bb'

    fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${chaveAPI}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

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

