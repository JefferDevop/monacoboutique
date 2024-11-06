import React, { useEffect, useState } from "react";
import { useAuth, useCart } from "@/hooks";
import { Auth } from "@/api";
import { Separator, NotFound, ListPayment } from "@/components";
import { BasicLayout } from "@/layouts";

const authCtrl = new Auth();

export default function PaymentPage() {
  const { user, accesToken, login } = useAuth();
  const { cart, product, loading } = useCart();

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

  const hasProducts = product && product.length > 0;

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
