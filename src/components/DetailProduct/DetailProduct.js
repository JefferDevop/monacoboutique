import React, { useEffect, useState } from "react";

import { size, map } from "lodash";
import { BASE_NAME } from "@/config/constants";
import { useWhatsApp, useGallery, useCart } from "@/hooks";
// import { toast } from "react-toastify";
import { SizeColor } from "../ListProducts";


import { ImageCarousel } from "../ImageCarousel";

import {
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  CardTitle,
} from "reactstrap";

import { BsWhatsapp } from "react-icons/bs";
import styles from "./DetailProduct.module.scss";
import Delivery from "./Delivery";

export function DetailProduct(props) {
  const { product, productInventory, relate } = props;
  const { addCart } = useCart();
  const { getGalleryByCode, gallery } = useGallery();
  const { generateWhatsAppLink, items, selectedItem, handleItemClick } =
    useWhatsApp();
  const { ...productDetall } = product ?? {};

  const hasItems = size(relate) > 0;

  const [productData, setProductData] = useState(productDetall[0]);
  const [idProduct, setIdPropduct] = useState();
  const [offer, setOffer] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [propductWhatsApp, setPropductWhatsApp] = useState("");
  const [propductAlternaWhatsApp, setPropductAlternaWhatsApp] = useState("");
  const [quantity, setQuantity] = useState(1);

  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    getGalleryByCode(productData);
  }, []);

  const changeDetail = (data) => {
    setProductData(data);
    getGalleryByCode(data);
    window.scrollTo(0, 0);
  };
  
  //-----------------------------------------------

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  //-------------------------------------

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addProductToWhatsApp = (data) => {
    setPropductWhatsApp(data);
    toggleModal();
  };

  const addProductAlternaToWhatsApp = (data) => {
    setPropductAlternaWhatsApp(data);
    toggleModal();
  };

  const addDataToWhatsApp = () => {
    if (propductWhatsApp != "") {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        BASE_NAME + propductWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal();
    } else {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        propductAlternaWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal();
    }
  };

  const getOffer = (product) => {
    // setOffer(product.discount);
    setOffer(product);
  };

  if (product) {
    return (
      <>


        <div className={styles.detailProduct}>
          {productData?.price_old > productData?.price1 && (
            <div className={styles.offer}>
              <h5>¡OFERTA!</h5>
            </div>
          )}

          <div className={styles.product} id="seccion-1">
            {size(gallery) > 1 ? (
              <ImageCarousel gallery={gallery} />
            ) : productData?.images ? (
              <CardImg
                alt="Card image cap"
                src={BASE_NAME + productData?.images}
              />
            ) : (
              <CardImg alt="Card image cap" src={productData?.image_alterna} />
            )}

            <div className={styles.description}>
              <h5 className={styles.name_extend}>{productData?.name_extend}</h5>

              {productData?.images ? (
                <div
                  className={styles.whatsapp}
                  onClick={() =>
                    addProductToWhatsApp(
                      productData?.images +
                        " " +
                        productData?.name_extend +
                        " " +
                        "Referencia: " +
                        productData?.ref
                    )
                  }
                >
                  <BsWhatsapp size={25} color="white" />
                </div>
              ) : (
                <div
                  className={styles.whatsapp}
                  onClick={() =>
                    addProductAlternaToWhatsApp(
                      productData?.image_alterna +
                        " " +
                        productData?.name_extend +
                        " " +
                        "Referencia: " +
                        productData?.ref
                    )
                  }
                >
                  <BsWhatsapp size={25} color="white" />
                </div>
              )}
              {/* <p>Disponible {parseInt(productData?.qty)}</p> */}

              {productData?.price1 > 0 && (
                <h5> $ {format(parseInt(productData?.price1))}</h5>
              )}

              {productData?.price_old > 0 && (
                <h6> $ {format(parseInt(productData?.price_old))}</h6>
              )}

              <p>{productData?.description}</p>
            </div>







            <SizeColor propductTC={productInventory} getOffer={getOffer} />









            {hasItems && (
              <div className={styles.relate}>
                <p>PRODUCTOS RELACIONADOS</p>

                <div className={styles.list}>
                  {map(
                    relate.filter(
                      (product) => product.codigo !== productData.codigo
                    ), // Filtrar productos
                    (product, index) => (
                      <div key={index}>
                        {product.images ? (
                          <div
                            className={styles.list__product2}
                            onClick={() => changeDetail(product)}
                          >
                            <CardImg
                              alt="Card image cap"
                              src={BASE_NAME + product.images}
                            />

                            <div className={styles.name}>
                              <CardTitle>
                                <h5>{product.name_extend}</h5>
                                <h5>$. {format(product.price1)}</h5>
                              </CardTitle>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={styles.list__product2}
                            onClick={() => changeDetail(product)}
                          >
                            <CardImg
                              alt="Card image cap"
                              src={product.image_alterna}
                            />

                            <div className={styles.name}>
                              <CardTitle>
                                <h5>{product.name_extend}</h5>
                                <h5>$. {format(product.price1)}</h5>
                              </CardTitle>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}










            <Delivery />


          </div>




          <Modal centered isOpen={isOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Seleccione una Lìnea</ModalHeader>

            <ModalBody>
              <FormGroup>
                {items.map((item, index) => (
                  <Button
                    key={index}
                    color="success"
                    size="sm"
                    outline
                    className={index === selectedItem ? "selected" : ""}
                    onClick={() => handleItemClick(item)}
                  >
                    <BsWhatsapp size={20} /> WhatsApp MB
                  </Button>
                ))}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" outline color="secondary" onClick={toggleModal}>
                Cancelar
              </Button>
              <Button size="sm" color="success" onClick={addDataToWhatsApp}>
                Aceptar
              </Button>
            </ModalFooter>
          </Modal>




        </div>
      </>
    );
  } else {
    return <h5> La pagina no existe</h5>;
  }
}
