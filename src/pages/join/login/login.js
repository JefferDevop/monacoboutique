import React from "react";
import { useAuth } from "@/hooks";

import { LoginFormClient } from "@/components";


export default function LoginPage() {
  const { user } = useAuth();

  if (user) {
    window.location.replace("/");
    return null;
  }
  
  return (
    <>
      <LoginFormClient />     
    </>
  );
}
