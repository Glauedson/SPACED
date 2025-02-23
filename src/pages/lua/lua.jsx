import Header from '../components/header/header'
import HGBrasil from '../components/HgBrasil'
import './styles.css'
import { motion } from "framer-motion"


function Lua() {
  return (
    <>
      <Header />
      <main>

        <div className="Lua">
          <motion.div
          className="TextoLua"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1>LUA</h1>
            <p> MOON</p>
            <hr />
          </motion.div>
        </div>

        <motion.div
          className="informacoesSemanais"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p>Fases da lua durante a semana</p>

          <HGBrasil />

        </motion.div>

        <div className="horariosDia">
          <div className="nascerSol">
            Sol
          </div>

          <div className="nascerLua">
            Lua
          </div>
        </div>

      </main>
    </>
  )
}

export default Lua