import { useState, useEffect, createContext, useCallback } from "react";
import { Cart } from "@/api/cart";
import { Products } from "@/api/products";

const cartCtrl = new Cart();

export const CartContext = createContext();
const productCtrl = new Products();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);


  const fetchProducts = useCallback(async () => {
    if (cart.length === 0) {
      setProduct([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Inicia el estado de carga
      const data = await Promise.all(
        cart.map(async (item) => {
          const response = await productCtrl.getProductByCode(item.id);
          return { ...response, quantity: item.quantity };
        })
      );
      setProduct(data);
      localStorage.setItem("cart_products", JSON.stringify(data));
    } catch (error) {
      console.error(`Error al cargar productos: ${error}`);
    } finally {
      setLoading(false); // Desactiva el estado de carga
      localStorage.setItem("global_loading", false);
    }
  }, [cart]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("global_loading", true); // Actualiza el loading en localStorage
      fetchProducts();
    } else {
      setProduct([]);
      setLoading(false);
      localStorage.setItem("cart_products", JSON.stringify([]));
      localStorage.setItem("global_loading", false);
    }
  }, [cart, fetchProducts]);

  // Al montar, carga los datos desde localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("cart_products");
    setProduct(storedProducts ? JSON.parse(storedProducts) : []);
    setLoading(localStorage.getItem("global_loading") === "true");
  }, []);


  
  useEffect(() => {
    const response = cartCtrl.getAll();
    setCart(response);

    const und = cartCtrl.count();
    setTotal(und);
  }, []);

  const addCart = (itemId, quantity) => { 
    setLoading(true);
    cartCtrl.add(itemId, quantity);
    refreshTotalCart();
    setLoading(false);    
  };

  const decreaseCart = (itemId) => { 
    setLoading(true);
    cartCtrl.decrease(itemId);
    refreshTotalCart();
    setLoading(false);    
  };

  const incrementCart = (itemId) => { 
    setLoading(true);
    cartCtrl.increment(itemId);
    refreshTotalCart();
    setLoading(false);    
  };

  const deleteCart = (itemId) => { 
    setLoading(true);
    cartCtrl.delete(itemId);
    refreshTotalCart();
    setLoading(false);    
  };

  const deleteAllCart = () => { 
    setLoading(true);
    cartCtrl.deleteAll();
    refreshTotalCart();
    setLoading(false);    
  };

  const refreshTotalCart = () => {
    setTotal(cartCtrl.count());
    setCart(cartCtrl.getAll());
  };

  const data = {
    cart,
    total,
    loading,
    product,
    addCart,
    decreaseCart,
    incrementCart,
    deleteCart,   
    deleteAllCart,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
