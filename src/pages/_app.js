import React, { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/global.scss";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider, AuthProvider } from "@/contexts";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CategoryProvider } from '@/contexts/CategoryContext';


const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ("Notification" in window && Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        return permission;
      }
    };

    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const handleConnectionChange = () => {
      if (navigator.onLine) {
        showNotification();
      }
      if (navigator.offline) {
        console.log("sin conexion");
      }
    };

    // Suscribirse a los eventos de conexión
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    // Eliminar los event listeners cuando el componente se desmonte
    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("ServiceWorker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  const showNotification = () => {
    console.log("volvio la conexion");
    if ("Notification" in window && Notification.permission === "granted") {
      const notificationOptions = {
        body: "¡La conexión se ha restablecido!",
        icon: "/icon-192x192.jpg",
      };

      new Notification("Conexión Restablecida", notificationOptions);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>   
          <CartProvider>
          <CategoryProvider>
            <Component {...pageProps} />
            <ToastContainer
              autoClose={1000}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
            />
            </CategoryProvider>
          </CartProvider>      
      </AuthProvider>
      </QueryClientProvider>
  );
}
