import React, { useEffect, useState } from "react";
import { useCart, useAuth } from "@/hooks";
import { Products, Address, User, Auth } from "@/api";
import {
  Separator,
  NotFound,
  Footer,
  ListPayment,
} from "@/components";
import { BasicLayout } from "@/layouts";

const productCtrl = new Products();
const addressCtrl = new Address();
const authCtrl = new Auth();

export default function PaymentPage() {
  const { user, accesToken, login } = useAuth();
  const { cart } = useCart();
  const [products, setProducts] = useState([]); // Cambié a un array por consistencia
  const [address, setAddress] = useState(null); // Inicializar en null para mejor control
  const [loading, setLoading] = useState(true);

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
  }, []); // Dependencia `user`

  // Obtener productos del carrito
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Iniciar carga
      try {
        const data = await Promise.all(cart.map(item => 
          productCtrl.getProductByCode(item.id).then(response => ({
            ...response,
            quantity: item.quantity,
          }))
        ));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Finalizar carga
      }
    };

    if (cart.length > 0) { // Verificar que el carrito no esté vacío
      fetchProducts();
    } else {
      setLoading(false); // Finalizar carga si el carrito está vacío
    }
  }, [cart]);

  // Obtener dirección del usuario
  useEffect(() => {
    const fetchAddress = async () => {
      if (!user) return; // Asegurarse de que el usuario esté definido
      try {
        const response = await addressCtrl.getAddress(accesToken, user.id);
        setAddress(response);
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false); // Finalizar carga
      }
    };

    fetchAddress();
  }, [accesToken, user]); // Dependencias

  const hasProducts = products.length > 0; // Verificar si hay productos

  return (
    <BasicLayout>
      <Separator />
      {loading ? (
        <h1>Cargando ...</h1>
      ) : (
        hasProducts ? (
          <>
            <ListPayment addChange={setAddress} product={products} address={address} payMethod={'payMethod'} />
            <Footer />
          </>
        ) : (
          <NotFound title="Uppss... en este momento no hay productos para pagar"/>
        )
      )}
    </BasicLayout>
  );
}