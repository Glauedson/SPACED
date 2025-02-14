import { useState }  from "react"
import styles from "./header.module.css"
import logo from "../../../assets/icons/SPACED-02.png"
import logo1x1 from "../../../assets/icons/logo1x1.png"
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome"
import { faBars, faTimes, faHouse, faImage, faRocket, faMeteor, faCircleNotch } from "@fortawesome/free-solid-svg-icons"

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src={logo} alt="Logo" />
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
                <li><a href="#">
                  HOME
                  <FontAwesomeIcon 
                    icon={faHouse}
                    style={{ color: "#6e6d6d8e",
                              paddingLeft:"10px",
                              fontSize: "20px"
                    }}/>
                </a></li>

                <hr />
                <p>TÓPICOS</p>

                <li><a href="#">
                  APOD
                  <FontAwesomeIcon 
                    icon={faImage}
                    style={{ color: "#6e6d6d8e",
                              paddingLeft:"10px",
                              fontSize: "20px"
                    }}/>
                </a></li>

                <li><a href="#">
                  SPACEX
                  <FontAwesomeIcon 
                    icon={faRocket}
                    style={{ color: "#6e6d6d8e",
                              paddingLeft:"10px",
                              fontSize: "20px"
                    }}/>
                </a></li>

                <li><a href="#">
                  METEOROS
                  <FontAwesomeIcon 
                    icon={faMeteor}
                    style={{ color: "#6e6d6d8e",
                              paddingLeft:"10px",
                              fontSize: "20px"
                    }}/>
                </a></li>

              </ul>
            </nav>

        </div>
        
        <div className={styles.finalSidebar}>
          <hr />
          
          <div className={styles.eddie}>
            <FontAwesomeIcon 
                      icon={faCircleNotch}
                      style={{ color: "#5200FD",
                                fontSize: "40px"
                      }}/>
            
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

      {/* fechar a sidebar */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
    </>
  )
}

export default Header
