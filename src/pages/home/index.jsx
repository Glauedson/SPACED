import { motion } from "framer-motion"
import Header from '../components/header/header'
import './styles.css'
import LuaAPI from '../components/LuaAPI'
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Header />
      
      <motion.div 
        className="luaConteiner"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="luaDescricao">
          <h1>LUA</h1>
          <p>Gosta de admirar a lua? Eu também!<br/> 
          Confira as fases da lua para toda a semana e planeje seus dias com base no ciclo lunar. Veja a influência da lua em cada fase e acompanhe suas mudanças ao longo dos próximos dias!</p>

          <Link to="/LUA">
            <p>ACESSAR</p> 
          </Link>
        </div>
        <div className="luaBanner">
          <div className="luaBannerTopo">
            <div className="lua">
              <div className="mapaLua">
                
              </div>
            </div>
            <div className="infoLua">
              <p>FASE ATUAL DA LUA</p>
              <LuaAPI />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="conteinerApod">
        <div className="conteudoInterno">
        <motion.div 
        className="conteinerTextoApod"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="tituloAPOD">
              <p>APOD</p>
              <h1>ASTRONOMY PICTURE OF THE DAY</h1>

              <p>Veja a imagem astronômica do dia! A cada dia uma nova imagem do espaço é selecionada pela NASA e disponibilizada para você. Acompanhe as maravilhas do universo e descubra mais sobre o cosmos!</p>
            </div>

            <Link to="/APOD">
              <p>ACESSAR</p> 
            </Link>
          </motion.div>



        </div>
      </div>

    </>
  )
}

export default Home
