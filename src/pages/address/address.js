import React, { useEffect, useState } from "react";
import { Address } from "@/api"
import { useAuth } from "@/hooks";
import {
  Footer,
  FooterApp,  
  NotFound,  
  Separator,
  AddAddress,
  ListAddress,
} from "@/components";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";


const addressCtrl = new Address();

export default function CartPage() {

const { user, accesToken } = useAuth();
  const [address, setAddress] = useState(0);
  const [load, setLoad] = useState(true);
  const hasAddress = size(address) > 0;

  if (!user) {
    window.location.replace("/join/login");
    return null;
  }


  useEffect(() => {
    (async () => {
      try {
         const response = await addressCtrl.getAddress(accesToken, user.id);

         setAddress(response);
         setLoad(false);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }, []);

  return (
    <BasicLayout>
      <Separator />
      {load ? (
        <h1>Cargando ...</h1>
      ) : (
        <>
          {hasAddress ? (
            <>
              <ListAddress address={address}/>             
            </>
          ) : (
            <>
              <NotFound
                title={"Uppss... no se han creado direcciones de envio."}
              />
              <FooterApp component={<AddAddress />} modal={true} title1={"Volver"} link1={'/'} title2={"Crear Dirección"} link2={'/'} />
              <Footer />
            </>
          )}
        </>
      )}
    </BasicLayout>
  );
}
