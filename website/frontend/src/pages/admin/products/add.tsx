import axios from "axios";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import formStyles from "../../../../public/css/form.module.css";
import adminPageStyles from "../../../../public/css/pages/admin/common.module.css";
import productStyles from "../../../../public/css/pages/admin/products.module.css";
import { Input } from "../../../components/Input";
import { Layout } from "../../../components/Layout";
import { Preview } from "../../../components/Preview";
import {
  useCreateProductImageMutation,
  useCreateProductMutation,
  useSignS3Mutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { formatFileName } from "../../../utils/formatFileName";

const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  size: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  description: Yup.string(),
  price: Yup.number().required("Required"),
});

export const CreateProducts: React.FC<{}> = ({}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [previewsState, setPreviewsState] = useState(null);
  const [, signS3] = useSignS3Mutation();
  const [, createProduct] = useCreateProductMutation();
  const [, createProductImage] = useCreateProductImageMutation();

  const onDrop = async (acceptedFiles: any) => {
    setFiles(acceptedFiles);

    acceptedFiles.forEach((file: File) => {
      setPreviews([...previews, <Preview file={file} />]);
    });
  };

  const uploadToS3 = async (file: File, signedRequest: any) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(signedRequest, file, options);
  };

  return (
    <Layout style="indexWrapper">
      <div className={adminPageStyles.adminPageContainer}>
        <div className={adminPageStyles.adminPageTitleContainer}>
          <h1>Add a new Product.</h1>
          <div>
            <NextLink href="/admin/products/">
              <a className={adminPageStyles.newItemButton}>ALL ITEMS</a>
            </NextLink>
          </div>
        </div>
        <div
          className={`${adminPageStyles.mainContainer} ${productStyles.mainContainer}`}
        >
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: 0,
              size: "",
              url: "",
            }}
            validationSchema={productSchema}
            onSubmit={async (values) => {
              const response = await createProduct({ input: values });

              if (response.data.createProduct.id) {
                const productId = response.data.createProduct.id;

                console.log("productId", productId);
                console.log("files", files);

                await files.forEach(async (file: any) => {
                  const fileResponse = await signS3({
                    filename: formatFileName(file.name),
                    filetype: file.type,
                  });

                  const { signedRequest, url } = fileResponse.data.signS3;
                  await uploadToS3(file, signedRequest);

                  await createProductImage({ productId, url });

                  console.log("previews", previews);
                  // redirecionar para a tela do produto
                });
              }
            }}
          >
            {({ errors, touched }) => (
              <Form
                className={`${formStyles.form} ${productStyles.productForm}`}
              >
                <div>
                  <div className={productStyles.topInputContainer}>
                    <div className={productStyles.buildName}>
                      <Input
                        errors={errors.name}
                        touched={touched.name}
                        label="Name"
                        name="name"
                        placeholder="Example: Greek Circular Spawn | Hub"
                      />
                    </div>

                    <div className={productStyles.buildPrice}>
                      <Input
                        errors={errors.price}
                        touched={touched.price}
                        label="Price"
                        name="price"
                        type="number"
                        step="0.01"
                      />
                    </div>

                    <div className={productStyles.buildSize}>
                      <Input
                        errors={errors.size}
                        touched={touched.size}
                        label="Size"
                        name="size"
                        placeholder="Example: 300x300"
                      />
                    </div>
                  </div>

                  <Input
                    errors={errors.description}
                    touched={touched.description}
                    className={formStyles.textArea}
                    label="Description"
                    as="textarea"
                    name="description"
                    type="description"
                    placeholder="Build description"
                  />

                  <Input
                    errors={errors.url}
                    touched={touched.url}
                    className={formStyles.textArea}
                    label="URL"
                    name="url"
                    placeholder="Build URL"
                  />
                </div>
                <div className={adminPageStyles.dropzoneContainer}>
                  <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className={adminPageStyles.dropzone}
                      >
                        <input {...getInputProps()} />
                        <p>
                          Drag and drop some files here, or click to select
                          files
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  <div className={adminPageStyles.dropzonePreviews}>
                    {previews}
                  </div>
                </div>
                <button className={formStyles.submitButton} type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateProducts);
