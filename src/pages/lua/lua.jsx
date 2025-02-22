import Header from '../components/header/header'
import './styles.css'
import { motion } from "framer-motion"


function Lua() {
  return (
    <>
      <Header />
      <main>
        
        <h1>LUA</h1>
        <p> MOON</p>
        <hr />

        <motion.div
          className="Lua"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="LuaFundo"></div>
        </motion.div>

        <motion.div
          className="informacoesSemanais"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p>Fases da lua durante a semana</p>

          <div className="caixaDiasSemana">
            {["SEG", "TER", "QUA", "QUI", "SEX"].map((dia, index) => (
              <motion.div
                key={dia}
                className="caixaDia"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="caixaDiaFoto"></div>
                <div className="sombra"></div>
                <div className="dia">
                  <p>{dia}</p>
                </div>
                <div className="faseLua">
                  <p>GIBOSA MINGUANTE</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  )
}

export default Lua
