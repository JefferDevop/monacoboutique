import React from "react";
import { BasicLayout } from "@/layouts";
import { TimeDelivery, Footer, FooterApp, Separator } from "@/components";

  
  export default function PolicesPage() {
   
  
    return (
      <>
        <BasicLayout>
          <Separator />
         <br/>
          
         <TimeDelivery /> 
         <FooterApp title1={'Volver'} title2={'Inicio'} />
        </BasicLayout>
      </>
    );
  }
  