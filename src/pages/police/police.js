import React from "react";
import { BasicLayout } from "@/layouts";
import { ChangePolicies, Footer, FooterApp, Separator } from "@/components";
  
  export default function PolicesPage() {
   
  
    return (
      <>
        <BasicLayout>
          <Separator />
         <br/>
          
         <ChangePolicies />
         <FooterApp title1={'Volver'} title2={'Inicio'} />
         
          <Footer />
        </BasicLayout>
      </>
    );
  }
  