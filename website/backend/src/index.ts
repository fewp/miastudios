import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import { graphqlUploadExpress } from "graphql-upload";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME } from "./constants";
import { PortfolioImage } from "./entities/PortfolioImage";
import { PortfolioItem } from "./entities/PortfolioItem";
import { Product } from "./entities/Product";
import { ProductImage } from "./entities/ProductImage";
import { User } from "./entities/User";
import { ProductResolver } from "./resolvers/product";
import { S3Resolver } from "./resolvers/s3";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "ecommerce2",
    username: "postgres",
    password: "admin",
    synchronize: true,
    logging: true,
    entities: [User, Product, ProductImage, PortfolioItem, PortfolioImage],
  });

  // clear product table:
  // ProductImage.delete({});
  // Product.delete({});

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  // apply cors on all routes
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365.25 * 10, // cookie has 10 years duration
        httpOnly: true, // so people are not able to access cookie in frontend
        secure: false, // only works in http (since localhost isn't https)
        sameSite: "lax", // CSRF
      },
      saveUninitialized: false,
      secret: "saodfhaodskfpoasdoikasjfoiasdjoifuasiuyewqlknkmnvzxiuyqwe",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver, S3Resolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
    uploads: false,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(8888, () => {
    console.log("Server listening port 8888");
  });

  // Redis port
  // 6379
};

main().catch((err) => {
  console.error(err);
});
