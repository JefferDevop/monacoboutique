import React, { useState, useEffect } from "react";
import { Payment, Auth, User, Address } from "@/api";
import { useCart, useAuth } from "@/hooks";
import { map } from "lodash";
import {
  Button,
  CardImg,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_NAME } from "@/config/constants";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styles from "./ListPayment.module.scss";
import { AddAddress } from "../Address";

const paymentCtrl = new Payment();
const authCtrl = new Auth();
const userCtrl = new User();
const addressCtrl = new Address();

export function ListPayment({ product }) {
  const calculateShipping = (city) =>
    city?.trim().toLowerCase() === "cali" ? 12000 : 15000;

  const { accesToken, login, logout, user } = useAuth();
  const { decreaseCart, incrementCart, deleteAllCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const [hasSetInitialAddress, setHasSetInitialAddress] = useState(false);

  const [formData, setFormData] = useState(null);
  const [localAddress, setLocalAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [envio, setEnvio] = useState(() =>
    calculateShipping(selectedAddress?.city)
  );

  const subtotal = product.reduce(
    (acc, item) => acc + item[0]?.price1 * item.quantity,
    0
  );

  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if (!user || !user.id) return;
    const handleGetAddress = async () => {
      try {
        const response = await addressCtrl.getAddress(accesToken, user.id);
        setLocalAddress(response);

        if (!hasSetInitialAddress && response?.length > 0) {
          setSelectedAddress(response?.[0] || null);
          setHasSetInitialAddress(true);
        }
      } catch (error) {
        console.error("Error al agregar la dirección:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetAddress();
  }, [addressCtrl, accesToken, user?.id]);

  useEffect(() => {
    if (user && formData) handleNewAddress();
  }, [formData]);

  const handleNewAddress = async () => {
    try {
      const response = await addressCtrl.addAddress(
        formData,
        user.id,
        accesToken
      );
      // setFormData(null);

      // addChange();
      setSelectedAddress(response);
      await processPayment(response.id);
    } catch (error) {
      console.error("Error al agregar la dirección:", error);
    }
  };

  const selectecAddress = (address) => {
    setSelectedAddress(address);

    // setEnvio(calculateEnvio(address.city));
    setAddressModalOpen(!isAddressModalOpen);
  };

  const processPayment = async (addressId) => {
    try {
      const response = await paymentCtrl.createPayload(
        product,
        addressId,
        accesToken
      );
      // localStorage.setItem("init_point", response.init_point);
      window.location.href = response.init_point;
      deleteAllCart();
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
    }
  };

  const formik = useFormik({
    initialValues: getInitialValues(localAddress?.[0]),
    validationSchema: Yup.object(getValidationSchema()),

    onSubmit: async (formValue) => {
      if (user.email === "hh@gmail.com") {
        await logoutAndLogin(formValue);
      } else {
        const addressId = selectedAddress?.id || localAddress?.[0]?.id;
        addressId
          ? await processPayment(addressId)
          : setFormData(getFormData(formValue));
      }
    },
  });

  const logoutAndLogin = async (formValue) => {
    await logout();
    const { email, password } = formValue;
    await userCtrl.addUserApi({ email, password });
    const response = await authCtrl.login({ email, password });
    await login(response.access);
    setFormData(getFormData(formValue));
  };

  const toggleAddressModal = () => setAddressModalOpen(!isAddressModalOpen);
  const toggleAddress = () => setChangeAddress(!changeAddress);

  const toggleModal2 = () => {
    // addChange();
    setModalOpen2(!isModalOpen2);
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
    password: "Contraseña",
    email: "Correo Electrónico",
    city: "Ciudad",
    address: "Dirección",
    nota: "Nota",
  };

  return (
    <div className={styles.list}>
      <h2>Finalizar Compra</h2>
      <Form onSubmit={formik.handleSubmit}>
        {(!selectedAddress || localAddress?.length === 0) && !isLoading && (
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
                  $ {format(item[0]?.price1 * item.quantity)}
                </p>
                <div className={styles.btn}>
                  <AiOutlineMinusCircle
                    size={25}
                    onClick={() => decreaseCart(item[0]?.codigo)}
                  />
                  <h5>{item.quantity}</h5>
                  <AiFillPlusCircle
                    size={25}
                    onClick={() => incrementCart(item[0]?.codigo)}
                  />
                </div>
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
              {localAddress &&
                localAddress.map((addres, index) => (
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
        <AddAddress toggleModal2={toggleModal2} toggleAddress={toggleAddress} />
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
