import { BASE_API } from "../config/constants";

export class Products {

  async getProducts() {
    try {
      const url = `${BASE_API}/api/products/?active=true`;
      const response = await fetch(url);
      const result = await response.json();
      if (response.status !== 200) throw result;
      console.log(result);
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    const productsFilter = `item_id=${productId}`;
    try {
      const url = `${BASE_API}/api/inventory/?${productsFilter}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProductByCode(codigo) {
    const productsFilter = `codigo=${codigo}`;
    try {
      const url = `${BASE_API}/api/inventory/?${productsFilter}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;
   
      return result;
    } catch (error) {
      throw error;
    }
  }


  async getProductsByCategory(idCategory) {

    try {
      const productsFilter = `id_categoria=${idCategory}`;

      // const url = `${BASE_API}/api/product_category/?${productsFilter}`;
      const url = `${BASE_API}/api/inventory/?${productsFilter}`;
      const response = await fetch(url);
      const result = await response.json();    
      
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getInventoryBySlug(slug) {
    try {
      const productFilter = `slug=${slug}`;

      const url = `${BASE_API}/api/inventory/?${productFilter}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;
      
      return result;
    } catch (error) {
      throw error;
    }
  }



  async getProductBySlug(slug) {
    try {
      const productFilter = `slug=${slug}`;

      const url = `${BASE_API}/api/products/?${productFilter}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;
      
      return result;
     
      
    } catch (error) {
      throw error;
    }
  }



  async getProductByName(flag) {
    if (flag != "") {
      try {
        const productFilter = `flag=${flag}`;

        const url = `${BASE_API}/api/products/?${productFilter}`;
        const response = await fetch(url);
        const result = await response.json();

        if (response.status !== 200) throw result;

        return result;
      } catch (error) {
        throw error;
      }
    } else {
      return null
    }
  }

  async getProductByOfertAndExclusive() {
    try {
      const url = `${BASE_API}/api/productsOE/`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }


}
