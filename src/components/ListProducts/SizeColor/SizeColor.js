import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "reactstrap";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styles from "./SizeColor.module.scss";

export function SizeColor({ propductTC, getOffer, toggle }) {
  const { addCart } = useCart();
  const [productDetail, setProductDetail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const format = (number) => {
    const roundedNumber = Math.round(number);
    return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const tallas = useMemo(
    () => [...new Set(propductTC.map((item) => item.talla))],
    [propductTC]
  );

  const colores = useMemo(
    () => [...new Set(propductTC.map((item) => item.color))],
    [propductTC]
  );

  const availableColors = useMemo(() => {
    return selectedTalla
      ? [
          ...new Set(
            propductTC
              .filter((item) => item.talla === selectedTalla)
              .map((item) => item.color)
          ),
        ]
      : colores;
  }, [selectedTalla, propductTC]);

  const availableTallas = useMemo(() => {
    return selectedColor
      ? [
          ...new Set(
            propductTC
              .filter((item) => item.color === selectedColor)
              .map((item) => item.talla)
          ),
        ]
      : tallas;
  }, [selectedColor, propductTC]);

  const handleTallaClick = useCallback(
    (talla) => {
      setSelectedTalla((prevTalla) => (prevTalla === talla ? null : talla));

      if (selectedColor && !availableColors.includes(selectedColor)) {
        setSelectedColor(null);
      }
    },
    [selectedColor, availableColors]
  );

  const handleColorClick = useCallback(
    (color) => {
      setSelectedColor((prevColor) => (prevColor === color ? null : color));

      if (selectedTalla && !availableTallas.includes(selectedTalla)) {
        setSelectedTalla(null);
      }
    },
    [selectedTalla, availableTallas]
  );

  const getCodigoProducto = useCallback(
    (talla, color) =>
      propductTC.find((item) => item.talla === talla && item.color === color)
        ?.codigo || null,
    [propductTC]
  );

  const addData = useCallback(() => {
    const item = getCodigoProducto(selectedTalla, selectedColor);
    addCart(item, quantity);
    toast.success("¡Se agregó con éxito!");
  }, [selectedTalla, selectedColor, quantity, getCodigoProducto, addCart]);

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const getPrecioProducto = useCallback(
    (talla, color) =>
      propductTC.find((item) => item.talla === talla && item.color === color) ||
      null,
    [propductTC]
  );

  useEffect(() => {
    const product =
      selectedTalla && selectedColor
        ? getPrecioProducto(selectedTalla, selectedColor)
        : propductTC[0] || null;

    setProductDetail(product);
    if (product) getOffer(product);
  }, [selectedTalla, selectedColor, propductTC, getPrecioProducto, getOffer]);

  return (
    <div className={styles.sizeColor}>
      <div className={styles.sizeColor__container}>
        <h5>Talla</h5>
        {tallas.map((talla) => (
          <Button
            size="sm"
            key={talla}
            onClick={() => handleTallaClick(talla)}
            disabled={!availableTallas.includes(talla)}
            className={`${styles.button} 
            ${selectedTalla === talla ? styles.selected : styles.active}
            ${!availableTallas.includes(talla) ? styles.inactive : ""}`}
          >
            {talla}
          </Button>
        ))}

        <h5>Color</h5>
        {colores.map((color) => (
          <Button
            size="sm"
            key={color}
            onClick={() => handleColorClick(color)}
            disabled={!availableColors.includes(color)}
            className={`${styles.button} ${
              selectedColor === color ? styles.selected : styles.active
            } ${!availableColors.includes(color) ? styles.inactive : ""}`}
          >
            {color}
          </Button>
        ))}

        <div className={styles.quantity}>
          <h5>Cantidad</h5>

          <div>
            <AiOutlineMinusCircle onClick={decrementQuantity} size={25} />
            <p>{quantity}</p>
            <AiFillPlusCircle onClick={incrementQuantity} size={25} />
          </div>
        </div>
        {productDetail.product?.price_old > productDetail.product?.price1 && (
          <p>Prendas en promoción no tienen cambio</p>
        )}

        <div>
          <Button
            size="lg"
            block
            onClick={addData}
            disabled={!selectedTalla || !selectedColor}
          >
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
