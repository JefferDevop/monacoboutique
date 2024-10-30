import React from "react";

import { Button } from "reactstrap";

// import { LoginFormClient } from "@/components";


export default function Success() {
  
  
  return (
    <>
      <h1>Pago exitoso</h1> 
      <Button onClick={() => window.location.replace("/")}>Volver a la tienda</Button>
    </>
  );
}
