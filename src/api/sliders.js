import { BASE_API } from "../config/constants";


export class SlidersApi {
    async getAll() {
     try {
       const url = `${BASE_API}/api/sliders/`;  
       const response = await fetch(url);
       const result = await response.json();
 
       if(response.status !== 200) throw result;
       
       return result;
     } catch (error) {
       throw error;
     }
   }
  }
