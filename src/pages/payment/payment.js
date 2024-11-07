import React, { useEffect, useState } from "react";
import { useAuth, useCart } from "@/hooks";
import { Auth, Address } from "@/api";
import { Separator, NotFound, ListPayment } from "@/components";
import { BasicLayout } from "@/layouts";

const authCtrl = new Auth();
const addressCtrl = new Address();

export default function PaymentPage() {
  const { user, login, accesToken } = useAuth();
  const { cart, product, loading } = useCart();
  const [localAddress, setLocalAddress] = useState([]);
console.log("nuevo");


  // Comprobar el usuario y loguear si es necesario
  useEffect(() => {
    const handleLogin = async () => {
      if (!user) {
        try {
          const response = await authCtrl.login({ email: "hh@gmail.com", password: "1452" });
          login(response.access);
        } catch (error) {
          console.error("Error al iniciar sesión temporal:", error);
        }
      }else{
        
        const response = await addressCtrl.getAddress(accesToken, user.id);
        setLocalAddress(response);
      }
    };
  
    handleLogin();
  }, [user]);

  const hasProducts = product && product.length > 0;

  return (
    <BasicLayout>
      <Separator />
      {loading ? (
        <h1>Cargando ...</h1>
      ) : hasProducts ? (
        <>
          <ListPayment product={product} localAddress={localAddress} />
        </>
      ) : (
        <NotFound title="Uppss... en este momento no hay productos para pagar" />
      )}
    </BasicLayout>
  );
}
