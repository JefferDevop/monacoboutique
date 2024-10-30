import { useState } from "react";
import { Orders } from "@/api";

export function useOrder() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  


  const addOrders = async (dataProducts) => {  
      try {
      setLoading(true);
      const orders = new Orders();
      const response = await orders.addOrdersApi(dataProducts);
      setLoading(false);
    //   setOrders([...orders, response.data]);
      console.log(response);
      return response;

    } catch (error) {
      setError(error);
      console.error('Error al crear el pedido:', error);
    }
  };

  
  return {
    loading,
    error,
    addOrders, 
  };
}
