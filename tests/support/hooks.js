const { Before, AfterAll } = require("@cucumber/cucumber");
const { quitDriver } = require("./driver");

Before(async function () {
  await this.init();
});

AfterAll(async function () {
  await quitDriver();
});
