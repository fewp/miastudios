import { withUrqlClient } from "next-urql";
import NextImage from "next/image";
import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";

const Test = () => {
  return (
    <>
      <>
        <NextImage
          width={1000}
          height={1000}
          src="/assets/img/uploads/builds/10.png"
          alt="Picture of the author"
          // src={`./uploads/${images[index]}`}
        />
      </>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Test);
