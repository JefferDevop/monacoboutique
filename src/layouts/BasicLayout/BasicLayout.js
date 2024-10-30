import React from "react";
import { Footer, TopBar } from "@/components";
import { useCategories } from '@/contexts/CategoryContext';
import styles from "./BasicLayout.module.scss";

export function BasicLayout({ children }) {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className={styles.basicLayout}>
      <TopBar  categories={categories} isLoading={isLoading}  />
      
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? React.cloneElement(child, { categories }) : child
        )}
  
      <Footer />
    </div>
  );
}