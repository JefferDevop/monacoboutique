import React from 'react'


import styles from "./Loader.module.scss";
export function Loader() {

  return (
    <div className={styles.loader_container}>
    
        <div className={styles.spinner}></div>        
        <p>Cargando productos ...</p>
      

    </div>
  );
}

