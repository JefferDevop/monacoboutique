// import { BASE_API } from "../config/constants";

// export class PaymentMethod {
//   async getPaymentMethod(token, id) {
//     const slugFilter = `user_id=${id}`;
 
//     try {
//       const url = `${BASE_API}/api/address/?${slugFilter}`;
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, 
//         },
//       });
  
//       const result = await response.json();
  
//       if (response.status !== 200) throw result;     
//       return result;

//     } catch (error) {
//       throw error;
//     }
//   }

// }
