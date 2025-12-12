const { setWorldConstructor, setDefaultTimeout, Before, After } = require("@cucumber/cucumber");
const { getDriver, quitDriver } = require("./driver");
const LoginPage = require("../pages/LoginPage");

setDefaultTimeout(60000);

class CustomWorld {
  constructor() {
    this.driver = null;
    this.loginPage = null;
  }

  async init() {
    this.driver = await getDriver();
    this.loginPage = new LoginPage(this.driver);
  }

  async cleanup() {
    await quitDriver();
  }
}

setWorldConstructor(CustomWorld);