//import React, { useEffect, useState, useCallback } from "react";

import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks";
import { ListCart, NotFound, Separator } from "@/components";
import { BasicLayout } from "@/layouts";


export default function CartPage() {
  const { user } = useAuth();
  const { cart, product, loading } = useCart();
  // const [product, setProducts] = useState([]);
  //const [loadingProducts, setLoadingProducts] = useState(true);
  const hasProducts = product.length > 0;

  
  return (
    <BasicLayout>
      <Separator />
      {loading ? (
        <h1>Cargando...</h1>
      ) : hasProducts ? (
        <ListCart product={product}  />
      ) : (
        <NotFound title="Uppss... en este momento no hay productos en el Carrito" />
      )}
    </BasicLayout>
  );
}
