import styles from "./Apod.module.css"
import Header from "../components/header/header"

function APOD() {
  return (
    <>
      <Header />
      <main>
        <div className={styles.conteinerInicial}>
          <div className={styles.fotoData}>
            <div className={styles.foto}>
              
            </div>

            <div className={styles.infoFoto}>
              <div className={styles.data}>
                <p>DATA</p>
                <h3>05 MAR 2025</h3>
              </div>

              <div className={styles.autor}>
                <p>AUTOR</p>
                <h3>Rabeea Alkuwari</h3>
              </div>
            </div>
          </div>

          <div className={styles.informações}>
            <div className={styles.infoConteudo}>
              <h1>Starburst Galaxy Messier 94</h1>
              <p>Beautiful island universe Messier 94 lies a mere 15 million light-years distant in the northern constellation of the hunting dogs, Canes Venatici. A popular target for earth-based astronomers, the face-on spiral galaxy is about 30,000 light-years across, with spiral arms sweeping through the outskirts of its broad disk. But this Hubble Space Telescope field of view spans about 7,000 light-years or so across M94s central region. The sharp close-up examines the galaxys compact, bright nucleus and prominent inner dust lanes, surrounded by a remarkable bluish ring of young, massive stars. The massive stars in the ring appear to be less than about 10 million years old, indicating the galaxy experienced a corresponding well-defined era of rapid star formation. As a result, while the small, bright nucleus is typical of the Seyfert class of active galaxies, M94 is also known as a starburst galaxy. Because M94 is relatively nearby, astronomers can explore in detail reasons for the galaxys burst of star formation.  Todays Coverage: Moon Landing </p>

              <p>BAIXAR IMAGEM</p>
              <div className={styles.baixarImagem}>
                <button>HD</button>
                <button>SD</button>
              </div>

              <p>DIAS ANTERIORES</p>
              
              <div className={styles.HubDias}>
                <div className={styles.diaAnterior}>
                  <div className={styles.DiasFoto}>

                  </div>
                  <p>StarBurst Galaxy Messier 94</p>
                  <p>05 MAR 2025</p>
                </div>

                <div className={styles.diaAnterior}>
                <div className={styles.DiasFoto}>

                </div>
                <p>StarBurst Galaxy Messier 94</p>
                <p>05 MAR 2025</p>
                </div>

                <div className={styles.diaAnterior}>
                <div className={styles.DiasFoto}>

                </div>
                <p>StarBurst Galaxy Messier 94</p>
                <p>05 MAR 2025</p>
                </div>

                <div className={styles.diaAnterior}>
                <div className={styles.DiasFoto}>

                </div>
                <p>StarBurst Galaxy Messier 94</p>
                <p>05 MAR 2025</p>
                </div>

                <div className={styles.diaAnterior}>
                <div className={styles.DiasFoto}>

                </div>
                <p>StarBurst Galaxy Messier 94</p>
                <p>05 MAR 2025</p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default APOD
