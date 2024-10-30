import React from "react";
import { useAuth } from "@/hooks";
import { Button } from "reactstrap";

// import { LoginFormClient } from "@/components";


export default function RegisterPage() {
  const { user } = useAuth();

  if (user) {
    window.location.replace("/");
    return null;
  }
  
  return (
    <>
      <h1>Register</h1> 
      <Button onClick={() => window.location.replace("/")}>Volver</Button>
    </>
  );
}
