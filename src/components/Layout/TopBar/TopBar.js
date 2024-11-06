import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import { Categories } from "@/api";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";

import { useCart } from "@/hooks/useCart";
import {
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

import styles from "./TopBar.module.scss";
import { Redes } from "@/components/Redes";

// const categoriesCtrl = new Categories();

export function TopBar({ categories, isLoading }) {
  const router = useRouter();
  const { total } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // const toggleModal = () => {
  //   setIsOpen(!isOpen);
  // };

  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  function handleClickAdmin() {
    router.push("https://boutiquemonaco.workhard.site/admin-dashboard/");
  }

    const clearLocalStorage = () => {
      localStorage.clear();
      alert("Local storage cleared!");
      window.location.reload();
    };
 

  return (
    <div className={styles.topbar}>
      <div className={styles.topbar_component}>
        <div className={styles.right}>
          <div onClick={() => toggleModal()}>
            <BiMenu size={30} color="gray" />
          </div>

          <div>
            <BiMenu size={25} color="#FAF6F3" />
          </div>
        </div>

        <Link href="/">
          <CardImg src="/image/monaco-header-phone-2.png" alt="No hay logo" />{" "}
        </Link>

        <div className={styles.right}>
          <div onClick={() => router.push("/featured")}>
            <BsSearch size={25} color="gray" />
          </div>

          <div className={styles.cart} onClick={() => router.push("/cart")}>
            <p> {total > 0 ? total : ""}</p>
            <AiOutlineShoppingCart size={25} color="gray" />
          </div>
        </div>
      </div>

      <Redes />

      <div className={styles.topbar_category}>
        <p>
          <Link href="/">Inicio</Link>
        </p>
        {isLoading ? (
          <p>Cargando categorías...</p>
        ) : categories?.length > 0 ? (
          categories.map((category) => (
            <p key={category.id}>
              <Link href={`/products/${category.slug}`}>{category.name}</Link>
            </p>
          ))
        ) : (
          <p></p>
        )}
      </div>

      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Selección</ModalHeader>

        <ModalBody>
          <FormGroup>
            <p onClick={() => handleClickAdmin()}>Admin</p>
            <Button color="danger" onClick={clearLocalStorage}>
              Clear
            </Button>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggleModal}></Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
