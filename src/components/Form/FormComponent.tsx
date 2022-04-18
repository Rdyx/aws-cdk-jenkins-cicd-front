import React from "react";
import { useForm } from "react-hook-form";
import FormInputComponent from "./FormInputComponent";
import { FormValues } from "./FormInterfaces";

interface Props {
  inputs: string[];
  onFormSubmit: (formData: any) => void;
  loading: boolean;
}

export default function FormComponent(props: Props) {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: { [key: string]: string }) => {
    props.onFormSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      {props.inputs.map((input, index) => {
        return FormInputComponent({
          label: input,
          register: register,
          disabled: props.loading,
          defaultValue: "https://google.comz",
        });
      })}
      <input type="submit" />
    </form>
  );
}
