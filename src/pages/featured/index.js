export { default } from "./featured";

import { Products } from "@/api/products"; 


export async function getServerSideProps() {
const responseProduct =  "sfs"

  return {
    props: {
        products: responseProduct,
    },
  };
}
