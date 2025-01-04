import React, { useEffect, useState } from "react";
import { useAuth, useCart } from "@/hooks";
import { Auth, Address } from "@/api";
import { Separator, NotFound, ListPayment } from "@/components";
import { BasicLayout } from "@/layouts";

const authCtrl = new Auth();
const addressCtrl = new Address();

export default function PaymentPage() {
  const { user, login, accesToken, loading: authLoading } = useAuth();
  const { cart, product, loading } = useCart();
  const [localAddress, setLocalAddress] = useState([]);


  // Comprobar el usuario y loguear si es necesario
  useEffect(() => {
    const handleLoginAndFetchAddress = async () => {
      try {
        if (!user && !authLoading) {
          const response = await authCtrl.login({ email: "hh@gmail.com", password: "1452" });
          login(response.access); // Actualiza el estado de autenticación
        } else if (user && accesToken) {
          const response = await addressCtrl.getAddress(accesToken, user.id);
          setLocalAddress(response);
        }
      } catch (error) {
        console.error("Error durante la autenticación o la obtención de direcciones:", error);
      }
    };

    handleLoginAndFetchAddress();
  }, []);

  const hasProducts = product && product.length > 0;

  
  

  return (
    <BasicLayout>
      <Separator />
      {loading ? (
        <h1>Cargando ...</h1>
      ) : hasProducts ? (
        <>
          <ListPayment product={product} localAddress={localAddress} authLoading={authLoading} loading={loading} />
        </>
      ) : (
        <NotFound title="Uppss... en este momento no hay productos para pagar" />
      )}
    </BasicLayout>
  );
}