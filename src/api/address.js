import { BASE_API } from "../config/constants";

export class Address {
  async addAddress(data, idUser, token) {
    
    try {
      const url = `${BASE_API}/api/address/`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",         
        },
        body: JSON.stringify({
          title: data.title,
          name: data.name,
          lastname: data.lastname,
          address: data.address,
          phone: data.phone,
          email: data.email,
          password: data.password,
          city: data.city,
          country: "Colombia",
          user: idUser,
        }),
      };

      const response = await fetch(url, params);

      const result = await response.json();
     
      if (response.status !== 201) {
        throw new Error("Occurio un error al crear una nueva dirección");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAddress(token, id) {
    const slugFilter = `user_id=${id}`;
 
    try {
      const url = `${BASE_API}/api/address/?${slugFilter}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      const result = await response.json();
  
      if (response.status !== 200) throw result;     
      return result;

    } catch (error) {
      throw error;
    }
  }

}
