// import { Categories } from "@/api/category";
// import { Products } from "@/api/products";

export { default } from "./category";

// export async function getServerSideProps(context) {
 
//   const { params } = context;
//   const { category } = params;

//   const categoryCtrl = new Categories();
//   const productCtrl = new Products();

//   try {
//         const responseCategory = await categoryCtrl.getBySlug(category);
          
//     if (!responseCategory) {
//       return {
//         notFound: true,
//       };
//     }
  
//     const responseProduct = await productCtrl.getProductsByCategory(responseCategory?.id);

//     return {
//       props: {
//         category: responseCategory,
//         products: responseProduct || [],
//       },
//     };
//   } catch (error) {
 
//     console.error("Error fetching category or products:", error);

//     return {
//       props: {
//         category: null,
//         products: [],
//         error: "Failed to fetch data",
//       },
//     };
//   }
// }