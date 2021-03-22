import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import formStyles from "../../../public/css/form.module.css";
import styles from "../../../public/css/pages/register.module.css";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { useRegisterMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Layout style="registerWrapper">
      <aside className={styles.registrationContainer}>
        <div className={styles.registrationTitlesContainer}>
          <h1 className={styles.registerTitle}>Register.</h1>
          <h2 className={styles.registerSubtitle}>
            Create your account to use our website
          </h2>
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setErrors }) => {
            console.log({ values });
            const response = await register({ options: values });

            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              // conseguiu registrar o usuário
              router.push("/");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className={formStyles.form}>
              <Input
                errors={errors.username}
                touched={touched.username}
                label="Username"
                name="username"
                placeholder="Your username"
                autoComplete="username"
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

              <Input
                errors={errors.email}
                touched={touched.email}
                label="Email"
                name="email"
                type="email"
                placeholder="Your email"
                autoComplete="email"
              />

              <NextLink href="/login">Already have an account?</NextLink>

              <button className={formStyles.submitButton} type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </aside>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
