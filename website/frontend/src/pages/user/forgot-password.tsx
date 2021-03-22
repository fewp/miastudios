import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import styles from "../../../public/css/pages/login.module.css";
import { Layout } from "../../components/Layout";
import { Media } from "../../components/Media";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import formStyles from "./../../../public/css/form.module.css";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const forgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Layout style="indexWrapper" css="flex-cc">
      <Media />
      <main className={styles.loginMainContainer}>
        <div className={styles.loginTitleContainer}>
          <h2 className={styles.loginSubtitle}>MIA STUDIOS</h2>
          <h1 className={styles.loginTitle}>Reset your password</h1>
        </div>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordSchema}
          onSubmit={async (values) => {
            await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ errors, touched }) => (
            <Form className={formStyles.form}>
              <div className={formStyles.labelContainer}>
                <label htmlFor="email" className={formStyles.label}>
                  E-mail
                </label>
                {errors.email && touched.email ? (
                  <div className={formStyles.errorMessage}>{errors.email}</div>
                ) : null}
              </div>
              <Field
                name="email"
                placeholder="Your e-mail"
                autoComplete="email"
              />

              <div className={styles.loginBottomContainer}>
                <button className={formStyles.submitButton} type="submit">
                  Submit
                </button>
                <NextLink href="/register">Create an account</NextLink>
              </div>
              <div className={formStyles.resetMessageContainer}>
                {complete ? (
                  <>
                    If an account with that email exists, a password reset URL
                    was sent.
                  </>
                ) : null}
              </div>
            </Form>
          )}
        </Formik>
      </main>
      <Media align="right" />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(forgotPassword);
