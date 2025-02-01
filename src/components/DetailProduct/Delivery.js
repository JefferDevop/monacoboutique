import React from 'react'
import styles from "./DetailProduct.module.scss";

import Link from "next/link";
import { CiRead } from "react-icons/ci";

export default function Delivery() {
  return (
    <div className={styles.policies}>
              {/* <strong>
                <p>TIEMPO DE ENTREGA</p>
              </strong>
              <ul>
                <li>
                  <p>Cali, el mismo día o el siguiente</p>
                </li>
                <li>
                  <p>Nacional, de 4 a 5 días</p>
                </li>
              </ul> */}

              <Link href="/deliverytime">
                <p>
                  <strong>
                  TIEMPOS DE ENTREGA <CiRead size={30} />
                  </strong>
                </p>
              </Link>

              <Link href="/police">
                <p>
                  <strong>
                    POLITICAS DE CAMBIO <CiRead size={30} />
                  </strong>
                </p>
              </Link>
            </div>

  )
}
