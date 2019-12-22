import express from "express";
import uuid from "uuid/v1";

import getAutoSuggestUsers from "./utils/getAutoSuggestUsers.js";
import { updateUsers, getUsers } from "./users.js";

const app = express();

app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res, next) => {
  res.json(getUsers());
  next();
})

app.get("/user/:id", (req, res, next) => {
  const user = getUsers().find(user => user.id === req.params.id);
  res.json(user);
  next();
});

app.post("/user", (req, res, next) => {
  const user = {
    id: uuid(),
    ...req.body
  };
  getUsers().push(user);

  res.json(getUsers());
  next();
});

app.put("/user/:id", (req, res, next) => {
  const updatedUsers = getUsers().map(user => user.id === req.params.id ?
    { id: user.id,
      ...req.body
    } : user);
  updateUsers(updatedUsers);

  res.json(getUsers());
  next();
});

app.get("/auto-suggest/:loginSubstring", (req, res, next) => {
  const autoSuggestUsers = getAutoSuggestUsers(req.params.loginSubstring, req.query.limit);

  res.json(autoSuggestUsers);
  next();
});

app.delete("/user/:id", (req, res, next) => {
  const updatedUsers = getUsers().map(user => user.id === req.params.id ? {
    ...user,
    isDeleted: true
  } : user);
  updateUsers(updatedUsers);

  res.json(getUsers());
  next();
})