import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks";
import { Address } from "@/api";

import { Input, Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import styles from "./Address.module.scss";

const addressCtrl = new Address();

export function AddAddress(props) {
  const { toggleModal2 } = props;

  const { accesToken, user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await addressCtrl.addAddress(formValue, user.id, accesToken);

        toggleModal2();
        toast.success("Address added successfully");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className={styles.address}>
        <div className={styles.input}>
          <Input
            name="title"
            type="text"
            placeholder="Titulo de la Dirección"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.title}
          />
        </div>
        <div className={styles.input}>
          <Input
            name="name"
            type="text"
            placeholder="Nombres"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
        </div>
        <div className={styles.input}>
          <Input
            name="lastname"
            type="text"
            placeholder="Apellidos"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
        </div>
        <div className={styles.input}>
          <Input
            type="text"
            name="address"
            placeholder="Dirección"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.errors.address}
          />
        </div>

        <div className={styles.input}>
          <Input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.errors.city}
          />
        </div>

        <div className={styles.input}>
          <Input
            type="text"
            name="celphone"
            placeholder="Teléfono"
            value={formik.values.celphone}
            onChange={formik.handleChange}
            error={formik.errors.celphone}
          />
        </div>
        <div className={styles.input}>
          <Input
            type="text"
            name="email"
            placeholder="Correo"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
        </div>

        <Button block type="submit">
          Guardar
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    title: "",
    name: "",
    lastname: "",
    address: "",
    city: "",
    celphone: "",
    email: "",
  };
}

function validationSchema() {
  return Yup.object({
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    email: Yup.string().required(true),
    celphone: Yup.string().required(true),
  });
}
