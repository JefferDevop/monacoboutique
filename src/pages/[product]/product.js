import { useQuery } from "@tanstack/react-query";
import { Products } from "@/api/products";


import {
  DetailProduct,
  MenuAlterno,
} from "@/components";


export default function ProductPage({productSlug}) {  

 const productCtrl = new Products();

   // Consulta para obtener el producto
   const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", productSlug],
    queryFn: () => productCtrl.getProductBySlug(productSlug),
    enabled: !!productSlug,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onSuccess: (data) => {
      // Extrae el flag y ejecuta la consulta de productos relacionados
      if (data?.[0]?.flag) {
        queryClient.prefetchQuery(["relate", data[0].flag], () =>
          productCtrl.getProductByName(data[0].flag)
        );
      }
    },
  });

  // Consulta para obtener el inventario del producto
  const { data: inventory, isLoading: isLoadingInventory } = useQuery({
    queryKey: ["inventory", productSlug],
    queryFn: () => productCtrl.getInventoryBySlug(productSlug),
    enabled: !!productSlug,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  // Consulta para obtener productos relacionados
  const { data: relate, isLoading: isLoadingRelate } = useQuery({
    queryKey: ["relate", products?.[0]?.flag],
    queryFn: () => productCtrl.getProductByName(products?.[0]?.flag),
    enabled: !!products?.[0]?.flag,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });


  if (isLoadingProducts || isLoadingInventory ) {
    return <div>Cargando...</div>;
  }


  return (
    <div>
      <MenuAlterno back={"IoArrowBack"} />
      <DetailProduct
        product={products}
        relate={!isLoadingRelate ? relate : null}
        productInventory={inventory}
      />     
    </div>
  );
}
