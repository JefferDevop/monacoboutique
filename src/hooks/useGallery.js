import { useState } from "react";

import { getGalleryProductByCode } from "../api/gallery";

export function useGallery() {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGalleryByCode = async (data) => {
    try {
      setLoading(true);
      const response = await getGalleryProductByCode(data.codigo);

      if (Array.isArray(response)) {
        const updatedResult = [...response, data];
        setLoading(false);
        setGallery(updatedResult);
      
        
      } else {
        // Manejo de error o lógica según sea necesario
        console.error("getGalleryByCode no devolvió un array");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    error,
    loading,
    gallery,
    getGalleryByCode,
  };
}
