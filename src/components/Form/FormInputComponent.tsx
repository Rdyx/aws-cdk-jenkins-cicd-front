import React from "react";
import { Path, UseFormRegister, ValidationRule } from "react-hook-form";
import { FormValues } from "./FormInterfaces";

interface Props {
  label: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  disabled: boolean;
  className?: string;
  required?: boolean;
  pattern?: ValidationRule<RegExp>;
  defaultValue?: string;
}

export default function FormInputComponent(props: Props) {
  return (
    <div key={props.label}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        id={props.label}
        className={props.className || "w-full"}
        {...props.register(props.label, {
          required: props.required,
          pattern: props.pattern,
        })}
        defaultValue={props.defaultValue ? props.defaultValue : undefined}
        disabled={props.disabled}
      />
    </div>
  );
}
