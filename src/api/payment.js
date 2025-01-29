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
        throw new Error("Occurio un error al crear el pago");
      }      
      
      return result;
    } catch (error) {
      throw error;
    }
  }
}
