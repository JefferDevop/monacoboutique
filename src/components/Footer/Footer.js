import React, { useState } from "react";


import styles from "./Footer.module.scss";

// const categoriesCtrl = new Categories();

export function Footer() {
  const [categories, setCategories] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await categoriesCtrl.getAll();
  //       setCategories(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  return (
    <div className={styles.footer}>
      {/* <div>
        <div className={styles.content}>
          <h6>SOBRE NOSOTROS</h6>
          <div className={styles.link}>
            <p>
              <Link href="/about">Nosotros</Link>
            </p>
            <p>
              <Link href="/contact">Contacto</Link>
            </p>           
          </div>
        </div>

        <h6>CATEGORÍAS</h6>
        <div className={styles.link}>
          {map(categories, (category) => (
            <p key={category.id}>
              <Link href={`/products/${category.slug}`}> {category.name} </Link>
            </p>
          ))}
        </div>
      </div> */}
      <div>
        <p className={styles.copyright}>
        MÓNACO BOUTIQUE <br/> Copyright © 2025. Todos los derechos
          reservados <br />
          Desarrollado por: SupraInnovations <br />
          Cel: 300 530 9990
          Versión 6.8.0
        </p>
      </div>
    </div>
  );
}
