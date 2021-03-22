import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import commonStyles from "../../../../public/css/pages/admin/common.module.css";
import styles from "../../../../public/css/pages/admin/products.module.css";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";

export const Products: React.FC<{}> = ({}) => {
  const body = (
    <tr>
      <td>[]</td>
      <td>#1111</td>
      <td></td>
      <td>
        Produto muito foda mesmo
        <p>300x300</p>
      </td>
      <td>Descrição muito foda</td>
      <td>
        04/10/2000 - 11 PM
        <p>Last update</p>
      </td>
      <td>
        $45
        <p>USD</p>
      </td>
      <td></td>
    </tr>
  );

  return (
    <Layout style="indexWrapper">
      <div className={commonStyles.adminPageContainer}>
        <div className={commonStyles.adminPageTitleContainer}>
          <h1>Shop Dashboard</h1>
          <div>
            <button className={commonStyles.filterButton}>FI</button>
            <div className={commonStyles.searchBoxContainer}>
              <input placeholder="Search..."></input>
              <button>GO</button>
            </div>
            <NextLink href="/admin/products/add">
              <a className={commonStyles.newItemButton}>NEW ITEM</a>
            </NextLink>
          </div>
        </div>
        <div className={commonStyles.mainContainer}>
          {body ? (
            <table
              className={`${styles.productsTable} ${commonStyles.commonTable}`}
            >
              <thead>
                <th>[]</th>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Price</th>
                <th>Options</th>
              </thead>
              <tbody>{body}</tbody>
            </table>
          ) : (
            <h1>No shop items in database</h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Products);
