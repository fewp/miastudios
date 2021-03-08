import { createConnection } from "typeorm";
import { Information } from "./entities/Information";

export default () => {
  return createConnection({
    type: "postgres",
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // logging: true, // uncomment for debugging
    synchronize: true, // automatically creates tables in DB, based on entities
    entities: [Information],
  });
};
