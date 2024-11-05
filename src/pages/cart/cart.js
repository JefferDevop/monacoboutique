import React, { useEffect, useState, useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks";
import { Products } from "@/api/products";
import { ListCart, NotFound, Separator } from "@/components";
import { BasicLayout } from "@/layouts";

const productCtrl = new Products();

export default function CartPage() {
  const { user } = useAuth();
  const { cart, product, loading } = useCart();
  // const [product, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const hasProducts = product.length > 0;

 console.log(product);
 
  // Función para cargar datos desde localStorage
  // const loadDataFromLocalStorage = () => {
  //   // Obtener los productos y el estado de carga desde localStorage
  //   const storedProducts = localStorage.getItem("cart_products");
  //   const storedLoading = localStorage.getItem("global_loading") === "true";

  //   // Parsear productos si existen en localStorage
  //   setProducts(storedProducts ? JSON.parse(storedProducts) : []);
  //   setLoadingProducts(storedLoading);
  // };
  


  // useEffect(() => {    
  //   loadDataFromLocalStorage();

  //   // Configurar escucha de almacenamiento para cambios en localStorage
  //   const handleStorageChange = (event) => {
  //     if (event.key === "cart_products" || event.key === "global_loading") {
  //       loadDataFromLocalStorage();
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   // Limpiar el listener al desmontar el componente
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);


  

  

  
  return (
    <BasicLayout>
      <Separator />
      {loading ? (
        <h1>Cargando...</h1>
      ) : hasProducts ? (
        <ListCart product={product} />
      ) : (
        <NotFound title="Uppss... en este momento no hay productos en el Carrito" />
      )}
    </BasicLayout>
  );
}
