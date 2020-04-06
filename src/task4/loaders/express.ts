import express from "express";
import * as routes from "../routes";

export default async ({ app }: { app: express.Application }) => { 
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  await routes.init({ app });
}
