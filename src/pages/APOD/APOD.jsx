import styles from "./Apod.module.css"
import Header from "../components/header/header"

function APOD() {
  return (
    <>
      <Header />
      <p className={styles.teste}>hello world</p>
    </>
  )
}

export default APOD
