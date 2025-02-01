import { BASE_API } from "../config/constants";

export class Payment {
  async createPayload(items, addressData, token) {

    const address = addressData.id;
    
    const bodyData = {
      items,
      address
    };
    
    
    try {
      const url = `${BASE_API}/api/payment/`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      };

      const response = await fetch(url, params);

      const result = await response.json();

      if (response.status !== 201) {
        if (response.status === 400 && result.error === "Stock insuficiente para algunos productos") {
            // Mensaje de error con los productos que tienen stock insuficiente
            console.error("Productos con stock insuficiente:", result.productos);
            
            alert("Algunos productos no tienen stock suficiente:\n" + 
                result.productos.map(prod => `Nombre: ${prod.name}, Disponible: ${prod.disponible}, Solicitado: ${prod.solicitado}`).join("\n")
            );

            return; // Detiene la ejecución si hay error de stock
        } else {
            throw new Error("Ocurrió un error al crear el pago");
        }
    }


      return result;
    } catch (error) {
      throw error;
    }
  }
}
