const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);

    this.emailInput = By.id("email");
    this.passwordInput = By.id("password");
    this.nextButton = By.id("next");
    this.dropdownMenu = By.id("dropdownMenu");
  }

  async open() {
    await this.driver.get("http://homolog-v2-4-ncommand-lite.ionic.health/");
    await this.driver.sleep(2000);
  }

  async fillEmailAndPassword(email, password) {
    await this.type(this.emailInput, email);
    await this.type(this.passwordInput, password);
  }

  async clickNext() {
    const nextButton = await this.driver.wait(
      until.elementLocated(this.nextButton),
      10000,
      "Botão NEXT não apareceu!"
    );
    await this.driver.wait(
      until.elementIsEnabled(nextButton),
      10000,
      "NEXT não ficou habilitado!"
    );
    await nextButton.click();
  }
  async dropdrowMenuVerify() { 
    await this.driver.wait(until.elementLocated(this.dropdownMenu), 10000 ); 
  }
}

module.exports = LoginPage;
