import React from "react";

import styles from "./AboutUs.module.scss";

export function ChangePolicies() {
  return (
    <>
      <h3>POLITICAS DE CAMBIO</h3>
      <div className={styles.police}>
        <br />
        <p>
          Esta política de cambio establece las condiciones bajo las cuales se
          realizarán los cambios en los productos y servicios ofrecidos por la
          empresa.
        </p>

        <ul>
          <li>No se hace devolución de dinero</li>
          <li>
            Se cambia si la prenda lleva 8 días después de haber sido entregada
          </li>
          <li>
            La prenda se cambia si es por IMPERFECTO o por TALLA: Podrás
            cambiarlo por REFERENCIA o por otra TALLA
          </li>
          <li>
            ⁠Monaco boutique se hace responsable del domicilio ÚNICAMENTE si la
            prenda tiene algún imperfecto
          </li>
          <li>
            Las prendas que hayan sido lavadas, usadas, dañadas o con algún tipo
            de arreglo NO tienen cambio
          </li>
        </ul>

        <strong>⁠PRODUCTOS EN PROMOCIÓN</strong>
        <ul>
          <li>⁠Los productos en promoción NO tienen cambio</li>
        </ul>
      </div>
    </>
  );
}
