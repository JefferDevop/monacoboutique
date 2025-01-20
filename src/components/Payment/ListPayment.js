import React, { useState, useEffect } from "react";
import { Payment, Auth, User, Address } from "@/api";
import { useCart, useAuth } from "@/hooks";
import { map } from "lodash";
import { toast } from "react-toastify";
import {
  Button,
  CardImg,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_NAME } from "@/config/constants";
// import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styles from "./ListPayment.module.scss";
import { AddAddress } from "../Address";
import { LoginFormClient } from "../LoginFormClient";

const paymentCtrl = new Payment();
const authCtrl = new Auth();
const userCtrl = new User();
const addressCtrl = new Address();

export function ListPayment({ product, localAddress, authLoading }) {
  const [address, setAddresses] = useState(localAddress);
  const calculateShipping = (city) => {
    return city?.trim().toLowerCase() === "cali" ? 12000 : 15000;
  };

  console.log("-----", product);
  

  const { accesToken, login, logout, user } = useAuth();
  // const { decreaseCart, incrementCart, deleteAllCart } = useCart();
  const { deleteAllCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [isModalOpen3, setModalOpen3] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  // const [hasSetInitialAddress, setHasSetInitialAddress] = useState(false);

  // const [formData, setFormData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [envio, setEnvio] = useState("");

  useEffect(() => {
    setAddresses(localAddress);
  }, [localAddress]);

  const subtotal = product.reduce(
    (acc, item) => acc + item[0]?.product.price1 * item.quantity,
    0
  );

  const format = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };


  const selectecAddress = (address) => {
    setSelectedAddress(address);

    // setEnvio(calculateEnvio(address.city));
    setAddressModalOpen(!isAddressModalOpen);
  };

  const logeo = async (email, password) => {
    const response = await authCtrl.login({ email, password });
    if (!response) {
      toast.warning("El numero de cedula no concuerda con el usuario");
      return;
    }

    await login(response.access); // Actualiza el estado de autenticación
    window.location.replace("/payment");
  };

  const processPayment = async (address) => {
    try {
      const response = await paymentCtrl.createPayload(
        product,
        address,
        accesToken
      );
      // localStorage.setItem("init_point", response.init_point);
      window.location.href = response.init_point;
      // window.open(response.init_point, "_blank");
      // window.location.replace("/");
      deleteAllCart();
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
    }
  };

  useEffect(() => {
    if (selectedAddress?.city) {
      setEnvio(calculateShipping(selectedAddress.city));
    }
  }, [selectedAddress]);

  useEffect(() => {
    setSelectedAddress(address?.[0] || null);
  }, [address]);

  const formik = useFormik({
    initialValues: getInitialValues(selectedAddress || address),
    // validationSchema: Yup.object(getValidationSchema()),
    onSubmit: async (formValue) => {
      try {
        setIsLoading(true);
        if (user.email === "hh@gmail.com") {
          const { email, password } = formValue;
          const newUser = await userCtrl.addUserApi({ email, password });

          const value1 = "Ya existe un/a Usuario con este/a Correo.";
          const value2 = newUser?.email;

          if (value1 === value2[0]) {
            logeo(email, password);

            setIsLoading(false);
            return; // Salir del flujo de creación de usuario si el correo ya existe
          }

          // Si el correo no existe, crear el usuario y continuar con el pago
          await logout();
          const response = await authCtrl.login({ email, password });
          await login(response.access);

          const newAddress = await addressCtrl.addAddress(
            formValue,
            newUser.id,
            accesToken
          );

          await processPayment(newAddress);
          setIsLoading(false);
        } else {
          // Procesar pago directamente si ya hay un usuario logeado
          const addressId = selectedAddress || address[0];

          await processPayment(addressId);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error al procesar el pago:", error);
        setIsLoading(false);
      }
    },
  });

  const addNewAddress = (newAddress) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

  const toggleAddressModal = () => setAddressModalOpen(!isAddressModalOpen);
  const toggleAddress = () => setChangeAddress(!changeAddress);

  const toggleModal2 = () => {
    // addChange();
    setModalOpen2(!isModalOpen2);
  };

  const toggleModal3 = () => {
    // addChange();
    setModalOpen3(!isModalOpen3);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    formik.setFieldValue("city", city);
    setEnvio(calculateShipping(city));
  };

  const fieldLabels = {
    name: "Nombre",
    lastname: "Apellido",
    phone: "Teléfono",
    password: "Identificación",
    email: "Correo Electrónico",
    city: "Ciudad",
    address: "Dirección",
    nota: "Nota",
  };

  return (
    <div className={styles.list}>
      {isLoading && (
        <div className={styles.loadingPayment}>
          <h1>Estamos validando...</h1>
        </div>
      )}
      <h2>Finalizar Compra</h2>
      <Form onSubmit={formik.handleSubmit}>
        {address?.length < 1 && (
          <>
            {Object.keys(fieldLabels).map((field) => (
              <FormGroup key={field}>
                <Input
                  id={field}
                  name={field}
                  placeholder={fieldLabels[field]}
                  type={field === "nota" ? "textarea" : "text"}
                  value={formik.values[field]}
                  onChange={
                    field === "city" ? handleCityChange : formik.handleChange
                  }
                  invalid={formik.touched[field] && !!formik.errors[field]}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <div className="text-danger">{formik.errors[field]}</div>
                )}
              </FormGroup>
            ))}
          </>
        )}

        <div className={styles.detalle}>
          {map(product, (item) => (
            <div key={item[0]?.codigo} className={styles.card}>
              <CardImg
                alt="Card image cap"
                src={BASE_NAME + (item[0]?.images || item[0]?.image_alterna)}
                className={styles.skeleton}
              />
              <div className={styles.detalle}>
                <label className={styles.name}>{item[0]?.name}</label>
                <p className={styles.price}>
                  $ {format(item[0]?.product.price1 * item.quantity)}
                </p>

                <p> Cantidad: {item.quantity}</p>
              </div>
              <hr />
            </div>
          ))}

          <div className={styles.totales}>
            <h3>Neto a Pagar</h3>
            <p>Subtotal: $ {format(subtotal)}</p>
            <p>Envío y manejo: $ {format(envio)}</p>
            <p>Total a Pagar: $ {format(subtotal + envio)}</p>
          </div>

          {selectedAddress && (
            <div className={styles.totales}>
              <h3>Datos de Entrega</h3>
              <p>Nombres: {selectedAddress.name}</p>
              <p>Apellidos: {selectedAddress.lastname}</p>
              <p>Dirección: {selectedAddress.address}</p>
              <p>Ciudad: {selectedAddress.city}</p>
              <p>Teléfono: {selectedAddress.phone}</p>
              <p>Correo: {selectedAddress.email}</p>
              {/* <Button outline onClick={toggleAddressModal}>Cambiar Dirección de Envío</Button> */}

              <Button outline onClick={() => toggleAddressModal()}>
                Cambiar Dirección de envio
              </Button>
            </div>
          )}
        </div>

        <Button block type="submit" color="secondary">
          Pagar
        </Button>
      </Form>

      <Modal centered isOpen={isAddressModalOpen} toggle={toggleAddressModal}>
        <ModalHeader toggle={toggleAddressModal}>
          Seleccione una Dirección
        </ModalHeader>

        <ModalBody>
          <div className={styles.modalContent}>
            <ul>
              {address &&
                address.map((addres, index) => (
                  <div key={index}>
                    <li onClick={() => selectecAddress(addres)}>
                      <h6>{addres.title}</h6>
                      <p>
                        NOMBRES: <label>{addres.name}</label>
                      </p>
                      <p>
                        APELLIDOS: <label>{addres.lastname}</label>
                      </p>
                      <p>
                        DIRECCIÓN: <label>{addres.address}</label>
                      </p>
                      <p>
                        CIUDAD: <label>{addres.city}</label>
                      </p>
                      <p>
                        TELÉFONO: <label>{addres.phone}</label>
                      </p>
                      <p>
                        CORREO: <label>{addres.email}</label>
                      </p>

                      <hr></hr>
                    </li>
                  </div>
                ))}
            </ul>
            <Button block onClick={toggleModal2}>
              Nueva Dirección
            </Button>
            <Button block outline onClick={toggleAddressModal}>
              Salir
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Modal centered isOpen={isModalOpen2} toggle={toggleModal2}>
        <ModalHeader toggle={toggleModal2}>Nueva Dirección</ModalHeader>
        <AddAddress
          toggleModal2={toggleModal2}
          toggleAddress={toggleAddress}
          addNewAddress={addNewAddress}
        />
        <ModalBody></ModalBody>
      </Modal>

      <Modal centered isOpen={isModalOpen3} toggle={toggleModal3}>
        <ModalHeader toggle={toggleModal3}>Inicia sesión</ModalHeader>
        <LoginFormClient toggleModal2={toggleModal3} />
        <ModalBody></ModalBody>
      </Modal>
    </div>
  );
}

// Formato de precios
const format = (num) => new Intl.NumberFormat("es-CO").format(num);

// Funciones utilitarias
const getInitialValues = (data) => ({
  name: data?.name || "",
  lastname: data?.lastname || "",
  phone: data?.phone || "",
  address: data?.address || "",
  city: data?.city || "",
  email: data?.email || "",
  password: data?.password || "",
  nota: data?.nota || "",
});

const getValidationSchema = () => ({
  name: Yup.string().required("El nombre es obligatorio"),
  lastname: Yup.string().required("El apellido es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio"),
  address: Yup.string().required("La dirección es obligatoria"),
  city: Yup.string().required("La ciudad es obligatoria"),
  email: Yup.string().email().required("El email es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const getFormData = (formValue) => ({
  title: "Principal",
  name: formValue.name,
  lastname: formValue.lastname,
  phone: formValue.phone,
  address: formValue.address,
  city: formValue.city,
  email: formValue.email,
  password: formValue.password,
});
