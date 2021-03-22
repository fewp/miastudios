import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import * as Yup from "yup";
import formStyles from "../../public/css/form.module.css";
import miscStyles from "../../public/css/misc/svg.module.css";
import styles from "../../public/css/pages/index.module.css";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Icon } from "../components/Icon";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { SliderBackground } from "../components/SliderBackground";
import { Socials } from "../components/Socials";
import { createUrqlClient } from "../utils/createUrqlClient";

const contactSchema = Yup.object().shape({
  discord: Yup.string().min(4, "Too short!").required("Required"),
  subject: Yup.string().max(50, "Too long!").required("Required"),
  text: Yup.string().max(2000, "Too long!").required("Required"),
});

const Index = () => {
  return (
    <>
      <Layout header={false}>
        <SliderBackground
          // fetch image names from db using graphql
          images={["10.png", "11.png"]}
        >
          <section className={styles.heroSection}>
            <h2>MIASTUDIOS</h2>
            <h1>CREATIVITY</h1>
            <h1>TAKES COURAGE</h1>
            <NextLink href="/portfolio">PORTFOLIO</NextLink>
            <Socials />
          </section>
        </SliderBackground>
        {/* services */}
        <section className={styles.servicesSection}>
          <h1>OUR SERVICES</h1>
          <div>
            <Card
              name="commissions"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, facilisis ut id lorem non. In amet tempus ac sit mi, feugiat. Consectetur in eu, mi in nulla eros, orci. Ut vivamus feugiat donec lacus in. Dignissim nibh odio."
            />
            <Card
              name="education"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, facilisis ut id lorem non. In amet tempus ac sit mi, feugiat. Consectetur in eu, mi in nulla eros, orci. Ut vivamus feugiat donec lacus in. Dignissim nibh odio."
            />
            <Card
              name="marketplace"
              text="Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, facilisis ut id lorem non. In amet tempus ac sit mi, feugiat. Consectetur in eu, mi in nulla eros, orci. Ut vivamus feugiat donec lacus in. Dignissim nibh odio."
            />
          </div>
        </section>

        <section
          className={`${styles.contactSection} ${miscStyles.backgroundSVG}`}
        >
          <div className={styles.infoContainer}>
            <h1>CONTACT US</h1>
            <h1>CONTACT US</h1>
            <div className={styles.discordInfoContainer}>
              <div>
                <a href="https://discord.gg/jWR9Nem">
                  <Icon name="discordForm" />
                </a>
                <p>
                  You can also get in touch with us through{" "}
                  <a href="https://discord.gg/jWR9Nem">Discord</a>!
                </p>
              </div>
              <p>
                Join now and follow these simple steps to create your ticket:
              </p>
              <ul>
                <li>Join our server</li>
                <li>Agree to our #terms-of-service</li>
                <li>Use the #create-a-ticket channel</li>
                <li>Follow the steps there and you're done!</li>
              </ul>
            </div>
          </div>
          <div className={styles.contactFormContainer}>
            <Formik
              initialValues={{
                discord: "",
                subject: "",
                text: "",
              }}
              validationSchema={contactSchema}
              onSubmit={async (values) => {}}
            >
              {({ errors, touched }) => (
                <Form className={`${formStyles.form} `}>
                  <div className={styles.contactFormInputContainer}>
                    <Input
                      errors={errors.discord}
                      touched={touched.discord}
                      label="DISCORD TAG"
                      name="discord"
                      placeholder="Your Discord tag"
                    />
                    <Input
                      errors={errors.subject}
                      touched={touched.subject}
                      label="SUBJECT"
                      name="subject"
                      placeholder="Your message's subject"
                    />
                  </div>
                  <Input
                    errors={errors.text}
                    touched={touched.text}
                    className={formStyles.textArea}
                    label="MESSAGE"
                    as="textarea"
                    name="text"
                    placeholder="Type your message here"
                  />

                  <button className={formStyles.submitButton} type="submit">
                    SEND MESSAGE
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </section>
        <Footer />
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
