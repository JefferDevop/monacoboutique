import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Register } from "../Register";

import { Auth } from "@/api";
import { useAuth } from "@/hooks";

import { ModalBasic } from "../Common";

import { Input, Label, Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import styles from "./LoginFormClient.module.scss";

const authCtrl = new Auth();

export function LoginFormClient() {
  const { login } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.login(formValue);
        login(response.access);
        window.location.replace("/payment");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <div className={styles.loginContent}>
          {/* <h4>Iniciar Sesión</h4> */}

          <div className={styles.input}>
            <Label for="title">Correo</Label>
            <Input
              name="email"
              type="email"
              placeholder=""
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
          </div>
          <div className={styles.input}>
            <Label for="password">Contraseña</Label>
            <Input
              type="password"
              name="password"
              placeholder=""
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
          </div>

          <Button block type="submit">
            Continuar
          </Button>

          {/* <Button block outline onClick={() => toggleModal()}>
            Crear una cuenta
          </Button> */}
        </div>
      </Form>

      {/* <ModalBasic show={isModalOpen} title="Crea una cuenta">
        <Register toggleModal={toggleModal} />
      </ModalBasic> */}
    </>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email("No es un email valido!")
      .required("Este campo es obligatorio!"),
    password: Yup.string().required("Este campo es obligatorio!"),
  };
}
