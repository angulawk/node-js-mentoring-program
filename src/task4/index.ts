import express from "express";
import { sequelize } from "./data-access/db";

import ValidationService from "./services/ValidationService";
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  getAutoSuggestList,
  deleteUser
} from "./routers/Users";

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export const app = express();

app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const validationService = new ValidationService();

app.get("/users", getUsers);

app.get("/user/:id", getUser);

app.post("/user", validationService.ValidateSchema(), addUser);

app.put("/user/:id", validationService.ValidateSchema(), updateUser);

app.get("/auto-suggest/:loginSubstring", getAutoSuggestList);

app.delete("/user/:id", deleteUser);
