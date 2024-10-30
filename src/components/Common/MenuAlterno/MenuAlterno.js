import React from "react";
import {
  SlArrowLeft,
  SlArrowRight,
  SlBasketLoaded,
  SlMagnifier,
} from "react-icons/sl";

import { useRouter } from "next/router";

import styles from "./MenuAlterno.module.scss";

export function MenuAlterno() {
  
const router = useRouter();


  const handleBack = () => {
    router.back();
  };

  const handlePayment = () => {
    router.push('/cart');
  };


  return (
    <div className={styles.menu}>
      <div className={styles.menu__left}>
      <SlArrowLeft onClick={()=> handleBack()} size={25} />
        {/* <SlArrowRight size={25} /> */}
      </div>

      <div className={styles.menu__right}>
        <SlMagnifier size={25} />
        <SlBasketLoaded onClick={()=> handlePayment()} size={27} />
      </div>
    </div>
  );
}
