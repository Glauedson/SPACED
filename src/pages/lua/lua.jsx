import Header from '../components/header/header'
import './styles.css'


function Lua() {
  return (
    <>
      <Header />
      <main>
        <h1>LUA</h1>
        <p> MOON</p>
        <hr />
        
        <div className="Lua">
          <div className="LuaFundo">
            
          </div>
        </div>

        <div className="informacoesSemanais">
          <p>Fases da lua durante a semana</p>
          <div className="caixaDiasSemana">

            <div className="caixaDia">
              <div className="caixaDiaFoto">
                
              </div>
              <div className="sombra"></div>
              <div className="dia"><p>SEG</p></div>
              <div className="faseLua">
                <p>GIBOSA MINGUANTE</p>
              </div>
            </div>

            <div className="caixaDia">
              <div className="caixaDiaFoto">
                
              </div>
              <div className="sombra"></div>
              <div className="dia"><p>TER</p></div>
              <div className="faseLua">
                <p>GIBOSA MINGUANTE</p>
              </div>
            </div>

            <div className="caixaDia">
              <div className="caixaDiaFoto">
                
              </div>
              <div className="sombra"></div>
              <div className="dia"><p>QUA</p></div>
              <div className="faseLua">
                <p>GIBOSA MINGUANTE</p>
              </div>
            </div>

            <div className="caixaDia">
              <div className="caixaDiaFoto">
                
              </div>
              <div className="sombra"></div>
              <div className="dia"><p>QUI</p></div>
              <div className="faseLua">
                <p>GIBOSA MINGUANTE</p>
              </div>
            </div>

            <div className="caixaDia">
              <div className="caixaDiaFoto">
                
              </div>
              <div className="sombra"></div>
              <div className="dia"><p>SEX</p></div>
              <div className="faseLua">
                <p>GIBOSA MINGUANTE</p>
              </div>
            </div>

          </div>
        </div>

      </main>
    </>
  )
}

export default Lua
