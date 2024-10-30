import styles from "./Contact.module.scss";
import { FooterApp } from "../FooterApp";

export function Contact() {
  return (
    <>
      <div className={styles.container}>
         <h1>INFINITY MARKET</h1>
        {/* <div className={styles.phone}>
        <h5>Líneas de atención</h5>
        <ul>
        <li>(+57) 315 428 0399</li>
         
        </ul> */} 
      </div>

      {/* <div className={styles.adress}>
      <h5>Ubicación:</h5>
        <p>Calle 11 # 9 - 20 Cali – Valle</p>
      </div>
      </div> */}
      <FooterApp />
    </>
  );
}
