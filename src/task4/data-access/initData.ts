import uuid from "uuid/v1";
import User from "../models/Users";

export function initData() {
  User.sync()
  .then(() => {
    return User.create({
      id: uuid(),
      login: "spiderman",
      password: "543545c45c3cc3",
      age: 25,
      isDeleted: false
    });
  })
  .then(() => {
    return User.create({
      id: uuid(),
      login: "batman",
      password: "fdgt5gre543g",
      age: 30,
      isDeleted: false
    });
  })
  .then(() => {
    return User.create({
      id: uuid(),
      login: "joker",
      password: "g4g5g4g45fsfd",
      age: 40,
      isDeleted: false
    });
  })
  .then(() => {
    return User.create({
      id: uuid(),
      login: "aga",
      password: "123456",
      age: 15,
      isDeleted: false
    });
  });
}
