import Header from '../components/header/header'
import LuaDias from '../components/LuaDias'
import LuaHorarios from '../components/LuaHorarios'
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

          <LuaDias />

        </motion.div>


        <LuaHorarios />

      </main>
    </>
  )
}

export default Lua