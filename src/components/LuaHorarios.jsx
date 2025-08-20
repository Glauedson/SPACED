import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faCloudMoon, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const chaveAPI = "d9289baed5b844fc836349e02a1172bb";

const LuaHorarios = () => {
  const [moonrise, setMoonrise] = useState("--:--");
  const [moonset, setMoonset] = useState("--:--");

  useEffect(() => {
    fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${chaveAPI}`)
      .then((response) => response.json())
      .then((data) => {
        setMoonrise(data.moonrise || "--:--");
        setMoonset(data.moonset || "--:--");
      })
      .catch((error) => console.error("Erro ao buscar dados da API:", error));
  }, []);

  return (
    <div className="horariosDia">
      <div className="nascerLua">
        <div className="LuaConteudo">
          <FontAwesomeIcon icon={faMoon} style={{ color: "#fcfcfc" }} className="LuaNascerIcon" />
          <div className="textoLuaHorarios">
            <p>NASCER DA LUA</p>
            <h1>{moonrise}</h1>
          </div>
        </div>
      </div>

      <div className="porLua">
        <div className="LuaConteudo">
          <FontAwesomeIcon icon={faCloudMoon} style={{ color: "#fcfcfc" }} className="LuaNascerIcon" />
          <div className="textoLuaHorarios">
            <p>PÔR DA LUA</p>
            <h1>{moonset}</h1>
          </div>
        </div>
      </div>

      <div className="infoHorarios">
        <FontAwesomeIcon icon={faCircleInfo} style={{ color: "rgba(0, 0, 0, 0.726)" }} className='IconInfo' />

        <p className='textoInfo'>
        Os horários de nascer e pôr da Lua indicam os momentos em que a Lua cruza o horizonte em sua ascensão e descida. Dependendo da fase da Lua e da posição da Terra, esses horários podem variar bastante. Se o nascer da Lua estiver marcado para a madrugada ( por exemplo, 5:07 AM ), significa que a Lua começará a aparecer nesse horário e será visível no céu durante parte da manhã. Isso acontece porque, assim como o Sol, a Lua segue um ciclo diário influenciado pela sua posição relativa à Terra e ao Sol. Em algumas fases, como a Lua Nova, ela pode nascer e se pôr durante o dia, enquanto na Lua Cheia, tende a nascer no início da noite e se pôr ao amanhecer
        </p>
      
      </div>
    </div>
  );
};

export default LuaHorarios;
