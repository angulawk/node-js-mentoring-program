import express from "express";
import loaders from "./loaders";

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(3000, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();
