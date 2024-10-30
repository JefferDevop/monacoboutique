import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";
import { useOrder } from "@/hooks";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { BASE_NAME } from "@/config/constants";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

import { BsTrash3 } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";

import styles from "./FooterCart.module.scss";

export function FooterCart(props) {
  const { products } = props;
  const { deleteAllCart } = useCart();
  const { addOrders } = useOrder();
  const { items, selectedItem, handleItemClick } = useWhatsApp();
  const router = useRouter();
  const [newOrder, setNewOrder] = useState([
    { item: "", qty: 0, price: 0.0, comment: "" },
  ]);
  const [detailOrder, setDetailOrder] = useState("");
  const [newArrayAsString, setNewArrayAsString] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const newObjectArray = [];
        const orderArray = [];

        for (const record of products) {
          const newRecord = {};

          for (const key in record) {
            if (
              Object.hasOwnProperty.call(record, key) &&
              [
                "name_extend",
                "quantity",
                "codigo",
                "images",
                "price1",
                "image_alterna",
                "ref",
              ].includes(key)
            ) {
              newRecord[key] = record[key];
            }
          }

          orderArray.push({
            price: newRecord.price1,
            item: newRecord.codigo,
            qty: newRecord.quantity,
            comment: "",
          });

          if (newRecord.images) {
            newObjectArray.push({
              Producto: newRecord.name_extend,
              Referencia: newRecord.ref,
              Cantidad: newRecord.quantity,
              Imagen: BASE_NAME + newRecord.images,
            });
          } else {
            newObjectArray.push({
              Producto: newRecord.name_extend,
              Referencia: newRecord.ref,
              Cantidad: newRecord.quantity,
              Imagen: newRecord.image_alterna,
            });
          }
        }
        const arrayProducts = JSON.stringify(newObjectArray, null, 2);
        setDetailOrder(arrayProducts);

        // setNewProduct(`Pedido No.  ${identificadorUnico} ${newArrayAsString}`);
        // setFollow(identificadorUnico);

        setNewOrder(orderArray);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }, [products]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  function handleClick(link) {
    router.push(link);
  }

  function confirmation() {
    const result = window.confirm(
      "¿Está seguro de eliminar los productos del Carrito?"
    );
    if (result) {
      deleteAllCart();
    }
  }

  const generateWhatsAppLink = (phoneNumber, message) => {
    const url = `https://wa.me/${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    return `${url}?text=${encodedMessage}`;
  };

  const addData = async () => {
    if (selectedItem) {
      const response = await addOrders(newOrder);

      toast.warning(response.detail);

      const { number, total } = response;
      if (number) {
        // alert("Tu pedido ha sido enviado con exito");
        // setNewArrayAsString(`Pedido No. ${number} Total: $${total}  ${detailOrder}`);
        const whatsappLink = generateWhatsAppLink(
          selectedItem,
          `Pedido No. ${number} Total: $${total}  ${detailOrder}`
        );
        window.location.href = whatsappLink;
        deleteAllCart();
      }

      toggleModal();
    }else{
      toast.warning("Debe seleccionar una Linea de Whatsapp");
    }
  };

  return (
    <div className={styles.btnWhatsapp}>
      <div className={styles.paneluser}>
        <BiArrowBack onClick={() => handleClick("/")} size="35" color="grey" />

        <Button
          className={styles.whatsapp}
          color="succefull"
          onClick={() => toggleModal()}
        >
          <BsWhatsapp size={30} color="green" />
          <p>Enviar Pedido</p>
        </Button>

        <BsTrash3 size="25" color="grey" onClick={confirmation} />
      </div>

      <Modal centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccione una Linea</ModalHeader>

        <ModalBody>
          {items.map((item, index) => (
            <Button
              key={index}
              color="success"
              size="sm"
              outline
              className={index === selectedItem ? "selected" : ""}
              onClick={() => handleItemClick(item)}
            >
              <BsWhatsapp size={20} /> Linea {index + 1}
            </Button>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button outline size="sm" color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button size="sm" color="success" onClick={() => addData()}>
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
