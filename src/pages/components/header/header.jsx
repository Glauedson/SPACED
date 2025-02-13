import styles from './header.module.css'
import logo from '../../../assets/icons/SPACED-02.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header (){
    return(
        <>
        <header className={styles.header}>
            <img className={styles.logo} src={logo} alt="teste"/>
            <FontAwesomeIcon icon={faBars} style={{ color: "#fcfcfc" }} className={styles.barras}/>
        </header>
        <div className={styles.subHeader}>
            <p>SITE AINDA NA VERSÃO BETA</p>
        </div>
        </>
    )
}

export default Header