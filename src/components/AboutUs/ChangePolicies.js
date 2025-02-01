import React from "react";

import styles from "./AboutUs.module.scss";

export function ChangePolicies() {
  return (
    <>
      <h3>Politicas de Cambio - Mónaco Boutique</h3>
      <div className={styles.police}>
        <br />
        <p>
          En <strong>Mónaco Boutique</strong>, queremos garantizar tu satisfacción. Por ello,
          hemos establecido las siguientes políticas para cambios de productos:
        </p>
<br/>
        <ul>
          <strong>DEVOLUCIONES DE DINERO</strong>
          <li>
            No realizamos devoluciones de dinero en ninguna circunstancia.
          </li>
          <strong>PLAZOS PARA CAMBIOS</strong>
          <li>
            Dispones de 8 días hábiles para solicitar el cambio de una prenda,
            contados a partir de la fecha de entrega del producto.
          </li>
          <strong>OPCIONES DE CAMBIO</strong>
          <li>
            <li>Las prendas pueden ser cambiadas por:</li>
            <ul>
              <li>Otra talla del mismo modelo</li>
              <li>
                Otra referencia de igual o mayor valor (cubriendo la diferencia
                si aplica)
              </li>
            </ul>
          </li>
          <strong> CONDICIONES PARA ACEPTAR CAMBIOS</strong>
          <li>
            El producto debe estar en perfecto estado, tal como fue entregado.
            No se aceptarán cambios en prendas que: Hayan sido lavadas, usadas o
            dañadas. Presenten arreglos o modificaciones realizadas por el
            cliente.
          </li>
          <li>Los productos en promoción no tienen cambio.</li>
<br/>
          <p>
            <strong>Mónaco Boutique</strong> cubrirá los costos de envío únicamente en los casos
            en los que la prenda presente defectos de fabricación. Si el cambio
            se debe a talla o preferencia, el cliente será responsable de los
            costos de envío asociados.             
            <br/>
            <br/>
            Nota: Estas políticas están diseñadas
            para garantizar una experiencia justa y transparente para todos
            nuestros clientes. Para iniciar un proceso de cambio, contáctanos a
            través de nuestros canales de atención al cliente.
          </p>
        </ul>
      </div>
    </>
  );
}
