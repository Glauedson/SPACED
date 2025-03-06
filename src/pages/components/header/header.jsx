import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "./header.module.css"
import logo from "../../../assets/icons/SPACED-02.png"
import logo1x1 from "../../../assets/icons/logo1x1.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes, faHouse, faImage, faCircleNotch, faMoon } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldAnimate(false);
      setTimeout(() => setShouldAnimate(true), 100);
    }
  }, [isOpen])

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>
        <FontAwesomeIcon
          icon={faBars}
          style={{ color: "#fcfcfc" }}
          className={styles.barras}
          onClick={() => setIsOpen(true)}
        />
      </header>

      <div className={styles.subHeader}>
        <p>SITE AINDA ESTÁ NA VERSÃO BETA</p>
      </div>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.conteudoTopo}>
          <div className={styles.topoNav}>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img className={styles.logo1x1} src={logo1x1} alt="Logo" />
          </div>

          <nav>
            <ul>
              {shouldAnimate && (
                <>
                  <motion.li
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <Link to="/">
                      HOME
                      <FontAwesomeIcon icon={faHouse} className={styles.icons} />
                    </Link>
                  </motion.li>

                  <hr />
                  <p>TÓPICOS</p>

                  <motion.li
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <Link to="/Lua">
                      LUA
                      <FontAwesomeIcon icon={faMoon} className={styles.icons} />
                    </Link>
                  </motion.li>

                  <motion.li
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Link to="/APOD">
                      APOD
                      <FontAwesomeIcon icon={faImage} className={styles.icons} />
                    </Link>
                  </motion.li>
                </>
              )}
            </ul>
          </nav>
        </div>

        <div className={styles.finalSidebar}>
          <hr />

          <div className={styles.eddie}>
            <FontAwesomeIcon
              icon={faCircleNotch}
              style={{ color: "#5200FD", fontSize: "40px" }}
            />
            <div className={styles.eddieTexto}>
              <p>APRENDA COM</p>
              <h3>EDDIEE IA</h3>
            </div>
          </div>

          <div className={styles.rodapeSidebar}>
            <p>EM BREVE MAIS ATUALIZAÇÕES</p>
          </div>
        </div>
      </div>

      {/* Fechar a sidebar */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
    </>
  )
}

export default Header
