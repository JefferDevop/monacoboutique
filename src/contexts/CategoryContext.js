import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Categories } from "@/api/category";

const categoriesCtrl = new Categories();
const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesCtrl.getAll(),
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
    cacheTime: 1000 * 60 * 10, // Mantenemos los datos en cache por 10 minutos
  });

  const value = useMemo(
    () => ({ categories, isLoading }),
    [categories, isLoading]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategories debe ser usado dentro de un CategoryProvider"
    );
  }
  return context;
};
