import Header from '../components/header/header'
import LuaDias from '../components/LuaDias'
import LuaHorarios from '../components/LuaHorarios'
import './styles.css'
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{once: true}}
        >
          <p>Fases da lua durante a semana</p>

          <LuaDias />
        </motion.div>

        <LuaHorarios />

        <motion.div 
          className="futurasAtualizacoes"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="conteudoAtualizacoes">
            <h3 className='tituloAtualizacoes'>FUTURAS ATUALIZAÇÕES</h3>

            <motion.div 
              className="caixaDeAtualizacoes"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="tipoDeAtualizacao">
                <p>PROXIMOS EVENTOS LUNARES</p>
                <FontAwesomeIcon icon={faChevronDown} style={{ color: "rgba(255, 255, 255, 0.73)" }} />
              </div>

              <div className="descricaoDaAtualizacao">
                <p>Exibirá eclipses lunares, superluas e outras ocorrências astronômicas.</p>
              </div>
            </motion.div>

            <motion.div 
              className="caixaDeAtualizacoes"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="tipoDeAtualizacao">
                <p>VISUALIZAÇÃO 3D</p>
                <FontAwesomeIcon icon={faChevronDown} style={{ color: "rgba(255, 255, 255, 0.73)" }} />
              </div>

              <div className="descricaoDaAtualizacao">
                <p>Um modelo interativo da Lua, girando em tempo real.</p>
              </div>
            </motion.div>

            <motion.div 
              className="caixaDeAtualizacoes"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="tipoDeAtualizacao">
                <p>MELHOR DIA PARA OBSERVAÇÃO</p>
                <FontAwesomeIcon icon={faChevronDown} style={{ color: "rgba(255, 255, 255, 0.73)" }} />
              </div>

              <div className="descricaoDaAtualizacao">
                <p>Baseado no clima e fase da Lua, indicar quando é ideal para ver a Lua cheia.</p>
              </div>
            </motion.div>

            <motion.div 
              className="caixaDeAtualizacoes"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="tipoDeAtualizacao">
                <p>HISTORIAS E MITOLOGIAS LUNAR</p>
                <FontAwesomeIcon icon={faChevronDown} style={{ color: "rgba(255, 255, 255, 0.73)" }} />
              </div>

              <div className="descricaoDaAtualizacao">
                <p>Lendas e histórias sobre a Lua em diferentes culturas.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  )
}

export default Lua