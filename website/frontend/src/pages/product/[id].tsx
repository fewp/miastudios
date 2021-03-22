import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { useGetProductQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

export const Product: NextPage<{ id: string }> = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [, getProduct] = useGetProductQuery();
  useEffect(() => {
    const productId = parseFloat(id);
    console.log("productId", productId);
    console.log("typeof productId", typeof productId);
    // pegar o produto e suas imagens
    getProduct({
      id: productId,
    });

    setProduct(getProduct({ id: productId }));
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#fff", width: "100%", height: "100vh" }}>
        {product}
      </div>
    </>
  );
};

Product.getInitialProps = ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default withUrqlClient(createUrqlClient)(Product as React.FC);
