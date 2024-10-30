import React, { useState, useRef, useEffect } from "react";
import styles from "./SearchTable.module.scss";
import { CardImg } from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";
import classNames from "classnames";
// import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { Search } from "./Search";
import { Products } from "@/api/products";

export function SearchTable() {
  const inputRef = useRef(null);
  const [estado, setEstado] = useState(false);
  const [products, setProducts] = useState({});
  const [finds, setFinds] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);


  const openCloseSearch = () => setShowSearch((prevState) => !prevState);


  useEffect(() => {
    // Enfocar el input cuando el componente se monta
    inputRef.current.focus();
  }, []);


  async function updateState(e) {
    const data = e.target.value;
    setSearch(data);
    setEstado(data);

    if (!estado) {
      const productsCtrl = new Products();
      const responseProduct = await productsCtrl.getProducts();
      setProducts(responseProduct);
    }
    if (estado) {
      filter(data);
    }
  }

  const filter = (filterTo) => {
    var result = products.filter((item) => {
      if (
        item.name_extend
          .toString()
          .toLowerCase()
          .includes(filterTo.toLowerCase()) ||
        item.description
          .toString()
          .toLowerCase()
          .includes(filterTo.toLowerCase()) ||
        item.description
          .toString()
          .toLowerCase()
          .includes(filterTo.toLowerCase())
      ) {
        return item;
      }
    });
    setFinds(result);
  };

  const changeStatus = () => {
    setEstado(false);
  };

  return (
    <>
      <div className={styles.searchTable}>
        <input
         ref={inputRef}
          onFocus={updateState}
          onBlur={updateState}
          onChange={updateState}
          value={search}
          className={classNames(styles.searchOption, {
            [styles.active]: showSearch,
          })}
        />
      </div>

      {estado && (
        <div className={styles.busqueda}>
          <Search products={finds} />
        </div>
      )}
    </>
  );
}
