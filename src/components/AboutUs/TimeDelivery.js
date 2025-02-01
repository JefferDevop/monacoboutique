import React from "react";

import styles from "./AboutUs.module.scss";

export function TimeDelivery() {
  return (
    <>
      <h3>Tiempos de Entrega - Mónaco Boutique</h3>
      <div className={styles.police}>
        <br />
        <p>
          En <strong>Mónaco Boutique</strong>, nos esforzamos por entregar tus
          pedidos de manera ágil y puntual. A continuación, te explicamos
          nuestros tiempos de entrega:
        </p>
        <br />
        <ul>
          <p>
            <strong>Entregas en Cali</strong>
          </p>

          <li>
            <p>
              <strong>De lunes a viernes:</strong>
            </p>
          </li>

          <p>
            Si realizas tu pedido <strong>antes</strong> de las{" "}
            <strong>4:00 p.m.</strong>, la entrega será el mismo día. Si tu
            pedido se realiza <strong>después</strong> de las
            <strong>4:00 p.m.</strong>, la entrega será al día siguiente.
          </p>

          <li>
            <p>
              <strong>Sabados:</strong>
            </p>
          </li>
          <p>
            Los pedidos realizados <strong>antes</strong> de las{" "}
            <strong>3:00 p.m.</strong> se entregarán el mismo sábado. Si haces
            tu pedido <strong>después</strong> de las <strong>3:00 p.m.</strong>
            , se entregará el lunes siguiente.
          </p>

          <p>
            <strong>Envíos nacionales</strong>
          </p>
          <p>
            Para otras ciudades de Colombia, los envíos se realizan a través de
            transportadoras reconocidas. El tiempo estimado de entrega es de{" "}
            <strong>3 a 4 días hábiles</strong> , dependiendo de la ubicación.
          </p>

          <p>
            <strong>Información adicional</strong>
          </p>
          <p>
            Ten en cuenta que los tiempos de entrega pueden variar por factores
            externos como días festivos, clima o retrasos de las
            transportadoras. Si necesitas confirmar el estado de tu pedido o
            tienes dudas, estamos disponibles para ayudarte a través de nuestros
            canales de atención al cliente.
          </p>
          <p>
            <strong>
              Gracias por elegir Mónaco Boutique. ¡Nos encanta ser parte de tu
              estilo!{" "}
            </strong>
          </p>
        </ul>
      </div>
    </>
  );
}
