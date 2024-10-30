import React, { useEffect, useState, useCallback } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks";
import { Products } from "@/api/products";
import { ListCart, NotFound, Redes, Separator } from "@/components";
import { BasicLayout } from "@/layouts";

const productCtrl = new Products();

export default function CartPage() {
  const { user } = useAuth();
  const { cart } = useCart();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasProducts = product.length > 0;

  // Función optimizada para obtener los productos
  const fetchProducts = useCallback(async () => {
    try {
      const data = await Promise.all(
        cart.map(async (item) => {
          const response = await productCtrl.getProductByCode(item.id);
          return { ...response, quantity: item.quantity };
        })
      );
      setProduct(data);
    } catch (error) {
      console.error(`Error al cargar productos: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // useEffect para cargar productos al cambiar el carrito
  useEffect(() => {
    if (cart.length > 0) {
      fetchProducts();
    } else {
      setProduct([]);
      setLoading(false);
    }
  }, [cart, fetchProducts]);

  return (
    <BasicLayout>
      <Separator />
      {loading ? (
        <h1>Cargando...</h1>
      ) : hasProducts ? (
        <ListCart product={product} />
      ) : (
        <NotFound title="Uppss... en este momento no hay productos en el Carrito" />
      )}
    </BasicLayout>
  );
}
