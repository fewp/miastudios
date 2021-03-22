import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";
import formStyles from "../../../../public/css/form.module.css";
import styles from "../../../../public/css/pages/register.module.css";
import { Layout } from "../../../components/Layout";
import { useChangePasswordMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { toErrorMap } from "../../../utils/toErrorMap";

const ChangePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <>
      <Layout style="registerWrapper">
        <aside className={styles.registrationContainer}>
          <div className={styles.registrationTitlesContainer}>
            <h1 className={styles.registerTitle} style={{ fontSize: "40px" }}>
              Password Reset.
            </h1>
            <h2 className={styles.registerSubtitle}>Change your password</h2>
          </div>
          <Formik
            initialValues={{
              newPassword: "",
              passwordConfirmation: "",
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={async (values, { setErrors }) => {
              console.log({ values });
              const response = await changePassword({
                newPassword: values.newPassword,
                token,
              });

              if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(
                  response.data.changePassword.errors
                );

                if ("token" in errorMap) {
                  setTokenError(errorMap.token);
                }
                setErrors(errorMap);
              } else if (response.data?.changePassword.user) {
                // conseguiu trocar a senha
                router.push("/");
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className={formStyles.form}>
                <div className={formStyles.labelContainer}>
                  {tokenError ? (
                    <>
                      <div className={formStyles.errorMessage}>
                        {tokenError}
                      </div>
                      <NextLink href="/forgot-password">
                        <p className={formStyles.labelLink}>
                          Click here to get a new one
                        </p>
                      </NextLink>
                    </>
                  ) : null}
                </div>
                <div className={formStyles.labelContainer}>
                  <label htmlFor="newPassword" className={formStyles.label}>
                    Password
                  </label>
                  {errors.newPassword && touched.newPassword ? (
                    <div className={formStyles.errorMessage}>
                      {errors.newPassword}
                    </div>
                  ) : null}
                </div>
                <Field
                  name="newPassword"
                  type="password"
                  placeholder="Your new password"
                  autoComplete="newPassword"
                />
                <div className={formStyles.labelContainer}>
                  <label
                    htmlFor="passwordConfirmation"
                    className={formStyles.label}
                  >
                    Confirm your password
                  </label>
                  {errors.passwordConfirmation &&
                  touched.passwordConfirmation ? (
                    <div className={formStyles.errorMessage}>
                      {errors.passwordConfirmation}
                    </div>
                  ) : null}
                </div>
                <Field
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Confirm your new password"
                  autoComplete="passwordConfirmation"
                />

                <button
                  className={formStyles.submitButton}
                  type="submit"
                  style={{ marginTop: "30px" }}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </aside>
      </Layout>
    </>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword as React.FC);
