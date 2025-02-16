import { motion } from "framer-motion";
import Header from '../components/header/header';
import './styles.css';

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

          <a href="#">
            ACESSAR
          </a>

          <div className="luaDescricaoTopicos">
            <p>LUA</p>
            <p>ATUALIZAÇÃO DIÁRIA</p>
          </div>
        </div>
        <div className="luaBanner">
          <div className="luaBannerTopo">
            Lua
          </div>
          <div className="luaBannerRodape">
            <p>São Paulo</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Home;
