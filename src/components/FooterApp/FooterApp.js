import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./FooterApp.module.scss";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Button,
} from "reactstrap";

export function FooterApp(props) {
  const { title, component, title1, title2, link1, link2, modal, user } = props;
  const [showModal, setShowModal] = useState(false);
  const { total } = useCart();
  const router = useRouter();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // const handleBack = () => {
  //   router.back(); // Vuelve a la página anterior
  // };

  // const handlePayment = () => {
  //   router.push('/payment'); // Vuelve a la página anterior
  // };

  // const actions = {
  //   'volver': handleBack,
  //   'Finalizar Compra': handlePayment,
  // };

  // actions[title1]?.();
 const handleClick = () => {    
    if (title1 === "Volver") {     
      router.back(); // Vuelve atrás en el historial
    } else if (title1 === "Finalizar Compra") {
      router.push("/payment"); // Redirige a la ruta /payment
    }
  };

  return (
    <div className={styles.btnWhatsapp}>
      {/* {user ? (
        <Link href={link1 ? link1 : "/payment"}>
        <div className={styles.title1}>{title1}</div>
      </Link>
      ):(
        <div onClick={() => toggleModal(true)} className={styles.title1}>
          {title1}
        </div>
      )}  */}

{user ? (
 title1 && (
  <div className={styles.title1} onClick={() => handleClick()}>
    {title1}
  </div>
)
):(
  <div className={styles.title1} onClick={() => handleClick()}>
    {title1}
  </div>
)}
     

      {!modal ? (
        <Link href={link2 ? link2 : "/"}>
          <div className={styles.title2}>{title2}</div>
        </Link>
      ) : (
        <div onClick={() => toggleModal(true)} className={styles.title2}>
          {title2}
        </div>
      )}

      <Modal centered isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>

        <ModalBody>
          <FormGroup>{component}</FormGroup>
        </ModalBody>
      </Modal>
    </div>
  );
}
