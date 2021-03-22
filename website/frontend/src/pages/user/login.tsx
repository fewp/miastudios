import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import formStyles from "../../../public/css/form.module.css";
import styles from "../../../public/css/pages/login.module.css";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { Media } from "../../components/Media";
import { useLoginMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const loginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
});

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Layout style="indexWrapper" css="flex-cc">
      <Media />
      <main className={styles.loginMainContainer}>
        <div className={styles.loginTitleContainer}>
          <h2 className={styles.loginSubtitle}>MIA STUDIOS</h2>
          <h1 className={styles.loginTitle}>Hello, welcome back!</h1>
        </div>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);

            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              // conseguiu registrar o usuário
              router.push("/");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className={formStyles.form}>
              <Input
                errors={errors.usernameOrEmail}
                touched={touched.usernameOrEmail}
                label="Username or Email"
                name="usernameOrEmail"
                placeholder="Your username or email"
                autoComplete="email"
              />

              <Input
                errors={errors.password}
                touched={touched.password}
                label="Password"
                name="password"
                type="password"
                placeholder="Your password"
                autoComplete="password"
              />

              <div className={styles.loginBottomContainer}>
                <NextLink href="/forgot-password">
                  Forgot your password?
                </NextLink>
                <button className={formStyles.submitButton} type="submit">
                  Submit
                </button>
                <NextLink href="/register">Create an account</NextLink>
              </div>
            </Form>
          )}
        </Formik>
      </main>
      <Media align="right" />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
