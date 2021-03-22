import { createConnection } from "typeorm";
import { Information } from "./entities/Information";
import { OldTicket } from "./entities/OldTicket";
import { Review } from "./entities/Review";
import { Ticket } from "./entities/Ticket";

export default () => {
  return createConnection({
    type: "postgres",
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    // logging: true, // uncomment for debugging
    synchronize: true, // automatically creates tables in DB, based on entities
    entities: [Information, Ticket, OldTicket, Review],
  });
};
