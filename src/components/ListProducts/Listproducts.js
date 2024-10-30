import { useState, useMemo } from "react";
import styles from "./ListProduts.module.scss";
import { Available } from "./Available";
import { Loader } from "@/components";

export function Listproducts({
  isLoadingCategories,
  isLoadingProducts,
  products = [],
  title,
}) {
  if (isLoadingCategories || isLoadingProducts) {
    return <Loader />;
  }

  return (
    <div className={styles.listProduct}>
      <h4>{title}</h4>
      <div className={styles.product}>
        <Available products={products} />
      </div>
    </div>
  );
}
