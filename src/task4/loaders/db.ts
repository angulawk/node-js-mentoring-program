const cls = require("cls-hooked");
const Sequelize = require("sequelize");

const namespace = cls.createNamespace("nodejs-mentoring");
Sequelize.useCLS(namespace);

const sequelize = new Sequelize("postgres://uptepqrypkhjar:3239abaa800ca6da4bc102d8356af7f1d8a192233049e738bfbbaab68acb43e7@ec2-54-246-121-32.eu-west-1.compute.amazonaws.com:5432/deh7sc4ufn3si0", {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: true
  }
});

export default async function() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch(err) {
    console.error("Unable to connect to the database:", err);
  }
}