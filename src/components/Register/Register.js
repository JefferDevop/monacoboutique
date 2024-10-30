import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { User, Auth } from "@/api";
import { useAuth } from "@/hooks";

import { Input, Label, Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import styles from "./Register.module.scss";

const userCtrl = new User();
const authCtrl = new Auth();

export function Register(props) {
  const { toggleModal } = props;
  const { login } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        await userCtrl.addUserApi(formValue);
        const response = await authCtrl.login(formValue);
        login(response.access);
        window.location.replace("/payment");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className={styles.loginContent}>
        <div className={styles.input}>
          <p for="title">CORREO</p>
          <label>Ingresa tu correo</label>
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
          <p for="password">CONTRASEÑA</p>
          <Label>Una contraseña que puedas recordar</Label>
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
          Guardar
        </Button>

        <Button block outline onClick={() => toggleModal()}>
          Cerrar
        </Button>
      </div>
    </Form>
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
