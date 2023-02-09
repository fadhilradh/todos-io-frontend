import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { Input } from "../components/atoms/Input";

function Form() {
  const options = ["", "Semarang", "Jakarta", "Bandung", "Medan"];

  const methods = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = methods;

  function onFormSubmit(data) {
    console.log(data);
    console.log(isValid);
  }

  const response = {
    username: "Fadhil",
  };

  useEffect(() => {
    setValue("username", response.username);
  }, []);

  return (
    <>
      <Navbar />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input className="w-56" {...register("username")} />
        </form>
      </FormProvider>
    </>
  );
}

export default Form;
