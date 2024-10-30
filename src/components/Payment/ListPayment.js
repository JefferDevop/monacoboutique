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
import { ModalBasic } from "../Common";
import { AddAddress } from "../Address";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Register } from "../Register";

import { BASE_NAME } from "@/config/constants";

import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./ListPayment.module.scss";

const paymentCtrl = new Payment();
const authCtrl = new Auth();
const userCtrl = new User();
const addressCtrl = new Address();

export function ListPayment(props) {
  const { accesToken, login, logout, user, loading } = useAuth();
  const { addChange, product, address, payMethod } = props;
  const { decreaseCart, incrementCart, deleteAllCart  } = useCart();
  const [show, setShow] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [envio, setEnvio] = useState(() => {
    if (!address[0]?.city || address[0]?.city === "") {
      return 0; // Si no hay ciudad, el valor inicial es 0
    } else if (address[0]?.city.toLowerCase() === "cali") {
      return 12000; // Si la ciudad es "Cali", el valor inicial es 12000
    } else {
      return 15000; // Para cualquier otra ciudad, el valor inicial es 15000
    }
  });
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [formData, setFormData] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  // const [initialData, setInitialData] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(
    Array.isArray(address) && address.length > 0 ? address[0] : null
  );

  const payment = async (product, address) => {
    
    try {
  //   const storedInitPoint = localStorage.getItem("init_point");

  // if (storedInitPoint) {
  //  window.location.href = storedInitPoint;
  //    return;
   //   }

      const response = await paymentCtrl.createPayload(
        product,
        address,
        accesToken
      );
      

      if (response && response.init_point) {
        localStorage.setItem("init_point", response.init_point);

       window.location.href = response.init_point;
       

        //limpiar Carrito
        deleteAllCart();
        
      
      } else {
        console.error("No se recibió una URL válida en la respuesta");
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
    }
  };

  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Cambia 'es-ES' por tu configuración regional
  };

  // Calcular el subtotal del carrito
  const subtotal = product.reduce(
    (acc, item) => acc + item[0]?.price1 * item.quantity,
    0
  );

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const onClose = () => setShow(!show);

  const toggleModal2 = () => {
    addChange();
    setModalOpen2(!isModalOpen2);
  };

  const selectecAddress = (address) => {
    setSelectedAddress(address);

    setEnvio(calculateEnvio(address.city));
    setModalOpen(!isModalOpen);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getDataFromDatabase(); // Llama a la función que trae los datos
  //       setInitialData(response);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        if (user.email === "hh@gmail.com") {
          await logout();
          const { email, password } = formValue;

          await userCtrl.addUserApi({ email, password });

          const response = await authCtrl.login({ email, password });
          await login(response.access);

          const newAddressData = {
            title: "Principal",
            name: formValue.name,
            lastname: formValue.lastname,
            celphone: formValue.phone,
            address: formValue.address,
            city: formValue.city,
            email,
            password,
          };

          setFormData(newAddressData);
        } else {
          payment(product, address[0].id);

        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  // const addAdress = async () => {
  //   await addressCtrl.addAddress(formValue, user.id, accesToken);
  // };

  // Función reutilizable para validar y calcular el valor de envío según la ciudad
  const calculateEnvio = (city) => {
    if (!city || city === "") {
      return 0; // Si la ciudad está vacía, retorna 0
    } else if (city.toLowerCase() === "cali") {
      return 12000; // Si es Cali, retorna 12000
    } else {
      return 15000; // Para cualquier otra ciudad, retorna 15000
    }
  };

  // handleCityChange usando la función reutilizable
  const handleCityChange = (event) => {
    const { value } = event.target; // Obtiene el valor ingresado en el input

    formik.setFieldValue("city", value); // Actualiza el valor de la ciudad en formik
    const envio = calculateEnvio(value); // Llama a la función de validación
    setEnvio(envio); // Actualiza el valor de envío
  };

  useEffect(() => {
    const addNewAddress = async () => {
      if (user && formData) {
        try {
          const response = await addressCtrl.addAddress(
            formData,
            user.id,
            accesToken
          );
          // setNewAddress(response);
          setFormData(null);
          addChange();
          setSelectedAddress(response);

          payment(product, response.id);
        } catch (error) {
          console.log("Error al agregar la dirección:", error.message);
        }
      }
    };

    addNewAddress();
  }, [formData]);

  return (
    <div className={styles.list}>
      <div className={styles.datosPeronales}>
        <h2>Finalizar Compra</h2>

        <Form onSubmit={formik.handleSubmit}>
          {(address[0].length < 1 || address[0]?.name === "Apellidos") && (
            <>
              <FormGroup floating>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.errors.name}
                />
                <Label for="Nombre">Nombre</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="lastname"
                  name="lastname"
                  placeholder="Apellido"
                  type="text"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={formik.errors.lastname}
                />
                <Label for="lastname">Apellido</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Teléfono"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.errors.phone}
                />
                <Label for="phono">Teléfono</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="password"
                  name="password"
                  type="text"
                  placeholder="Número de Identificacíon"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.errors.password}
                />
                <Label for="exampleEmail">Número de Identificación</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Correo"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.errors.email}
                />
                <Label for="email">Correo</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Ciudad"
                  value={formik.values.city}
                  onChange={handleCityChange}
                  error={formik.errors.city}
                />
                <Label for="city">Ciudad</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Dirección Completa"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.errors.address}
                />
                <Label for="address">Dirección Completa</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="nota"
                  name="nota"
                  placeholder="Notas del Pedido (Opcional)"
                  type="textarea"
                  value={formik.values.nota}
                  onChange={formik.handleChange}
                  error={formik.errors.nota}
                />
                <label for="nota">Notas del Pedido (Opcional)</label>
              </FormGroup>
            </>
          )}
          <div className={styles.detalle}>
            {/* <h5>Detalle de la Compra</h5> */}
            {map(product, (item) => (
              <div key={item[0]?.codigo} className={styles.card}>
                {item[0]?.images ? (
                  <CardImg
                    alt="Card image cap"
                    src={BASE_NAME + item[0]?.images}
                    className={styles.skeleton}
                  />
                ) : (
                  <CardImg
                    alt="Card image cap"
                    src={item[0]?.image_alterna}
                    className={styles.skeleton}
                  />
                )}

                <div className={styles.detalle}>
                  <label className={styles.name}>{item[0]?.name}</label>
                  <p className={styles.price}>
                    $ {format(item[0]?.price1 * item.quantity)}{" "}
                  </p>
                  {/* <p className={styles.price}>
                   - $ {format(item[0].discount * item.quantity)}
                  </p> */}

                  <label>
                    <div className={styles.btn}>
                      <AiOutlineMinusCircle
                        onClick={() => decreaseCart(item[0]?.codigo)}
                        size={30}
                      />
                      <h5>{item.quantity}</h5>
                      <AiFillPlusCircle
                        onClick={() => incrementCart(item[0]?.codigo)}
                        size={30}
                      />
                    </div>
                  </label>
                </div>
                <hr></hr>
              </div>
            ))}

            <div className={styles.totales}>
              <h3>Neto a Pagar</h3>

              <p>Subtotal: $ {format(subtotal)}</p>

              <p>Envío y manejo:$ {format(envio)}</p>

              {/* <p>Descuento: $ 0</p> */}
              <p>Total a Pagar: $ {format(subtotal + envio)}</p>
            </div>

            {address[0]?.name !== "Apellidos" && (
              <div className={styles.totales}>
                <h3>Dirección de envío</h3>

                {selectedAddress ? (
                  <>
                    <p>Nombres: {selectedAddress.name}</p>
                    <p>Apellidos: {selectedAddress.lastname}</p>
                    <p>Dirección: {selectedAddress.address}</p>
                    <p>Ciudad: {selectedAddress.city}</p>
                    <p>Teléfono: {selectedAddress.phone}</p>
                    <p>Correo: {selectedAddress.email}</p>
                  </>
                ) : (
                  <ModalBasic
                    onClose={onClose}
                    show={show}
                    title="Dirección de envio"
                  >
                    <AddAddress />
                  </ModalBasic>
                )}
                <Button outline onClick={() => toggleModal()}>
                  Cambiar Dirección de envio
                </Button>
              </div>
            )}

            {/* <Button block onClick={() => payment("Payment")}>
              Finalizar Compra
            </Button> */}
          </div>
          {/* <Button
            block
            type="submit"
            color="secondary"
            onClick={() => payment(product, selectedAddress?.id)}
            disabled={!selectedAddress}
          >
            Pagar
          </Button> */}
          <Button block type="submit" color="secondary">
            Pagar
          </Button>
        </Form>
      </div>

      <Modal centered isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccione una Dirección</ModalHeader>

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
            <Button block outline onClick={toggleModal}>
              Salir
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Modal centered isOpen={isModalOpen2} toggle={toggleModal2}>
        <ModalHeader toggle={toggleModal2}>Nueva Dirección</ModalHeader>
        <AddAddress toggleModal2={toggleModal2} />
        <ModalBody></ModalBody>
      </Modal>
    </div>
  );
}

function initialValues(data = {}) {
  return {
    name: data.name !== "Apellidos" ? data.name : "",
    lastname: data.lastname !== "apellidos" ? data.lastname : "",
    phone: data.phone !== "3236598" ? data.phone : "",
    password: data.password !== "Nuevo" ? data.password : "",
    email: data.email !== "Nuevo" ? data.email : "",
    city: data.city || "",
    address: data.address !== "Carrera 28 # 9b 41" ? data.address : "",
    nota: data.nota || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("Este campo es obligatorio!"),
    lastname: Yup.string().required("Este campo es obligatorio!"),
    phone: Yup.string().required("Este campo es obligatorio!"),
    email: Yup.string()
      .email("No es un email valido!")
      .required("Este campo es obligatorio!"),
    password: Yup.string().required("Este campo es obligatorio!"),
    city: Yup.string().required("Este campo es obligatorio!"),
    address: Yup.string().required("Este campo es obligatorio!"),
    nota: Yup.string(),
  };
}
