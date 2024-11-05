import React, { useEffect, useState } from "react";
import { useAuth, useCart } from "@/hooks";
import { Auth } from "@/api";
import {
  Separator,
  NotFound,
    ListPayment,
} from "@/components";
import { BasicLayout } from "@/layouts";

// const productCtrl = new Products();
// const addressCtrl = new Address();
const authCtrl = new Auth();

export default function PaymentPage() {
  const { user, accesToken, login } = useAuth();
  const { cart, product, loading } = useCart();
  // const [products, setProducts] = useState([]);
  // const [loadingProducts, setLoadingProducts] = useState(true);
  // const [address, setAddress] = useState("");
  // const [loadingAddress, setLoadingAddress] = useState(true);

  // Función para iniciar sesión temporalmente
  const loginUser = async () => {
    const initialValue = {
      email: "hh@gmail.com",
      password: "1452",
    };

    try {
      const response = await authCtrl.login(initialValue);
      login(response.access);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };


  // Comprobar el usuario y loguear si es necesario
  useEffect(() => {
    if (!user) {
      loginUser();
    }
  }, [user]); 


  //  // Función para cargar datos desde localStorage
  //  const loadDataFromLocalStorage = () => {
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



  // Obtener productos del carrito
  // useEffect(() => {
  //   if (cart.length === 0) {
  //     setLoadingProducts(false);
  //     return;
  //   }

  //   const fetchProducts = async () => {
  //     setLoadingProducts(true);
  //     try {
  //       const data = await Promise.all(
  //         cart.map(item =>
  //           productCtrl.getProductByCode(item.id).then(response => ({
  //             ...response,
  //             quantity: item.quantity,
  //           }))
  //         )
  //       );
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoadingProducts(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [cart]);


  // const isLoading = loadingProducts;
  const hasProducts = product.length > 0;

  return (
    <BasicLayout>
      <Separator />
      {loading ? (
        <h1>Cargando ...</h1>
      ) : hasProducts ? (
        <>
          <ListPayment product={product} />
        </>
      ) : (
        <NotFound title="Uppss... en este momento no hay productos para pagar" />
      )}
  
    </BasicLayout>
  );
}