import { Field } from "formik";
import React, { InputHTMLAttributes } from "react";
import formStyles from "../../public/css/form.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  errors?: string;
  touched?: boolean;
  label?: string;
  as?: string;
};

export const Input: React.FC<InputProps> = ({
  errors,
  touched,
  label,
  as,
  ...props
}) => {
  return (
    <div className={formStyles.inputContainer}>
      {label && props.name ? (
        <div className={formStyles.labelContainer}>
          <label htmlFor={props.name} className={formStyles.label}>
            {label}
          </label>
          {errors && touched ? (
            <div className={formStyles.errorMessage}>{errors}</div>
          ) : null}
        </div>
      ) : null}
      <Field as={as} {...props} />
    </div>
  );
};
