const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class SystemCheckPage extends BasePage {
  constructor(driver) {
    super(driver);

    this.titleH4 = By.css(".title-container h4"); // "System Check"
    this.technicianSelect = By.id("local"); // select do tipo de técnico
    this.runTestButton = By.css("section.action button.btn-primary"); // Run test
    this.resultTitle = By.xpath("//h4[text()='Result']"); // título da tela de resultado
  }

  async open() {
    await this.driver.get("http://homolog-v2-4-ncommand-lite.ionic.health/SystemCheck");
  }

  async verifyTitleVisible() {
    const titleElement = await this.driver.wait(
      until.elementLocated(this.titleH4),
      5000,
      "Título <h4> da página System Check não encontrado"
    );

    await this.driver.wait(
      until.elementIsVisible(titleElement),
      5000,
      "Título <h4> não está visível"
    );

    const text = await titleElement.getText();

    if (text.trim() !== "System Check") {
      throw new Error(
        `O título esperado era "System Check", mas foi encontrado: "${text}"`
      );
    }
  }

  async selectTechnician(type) {
    const label = await this.find(By.css(`label[for="${type}"]`));
    await label.click();
  }

  async clickRunTest() {
    const element = await this.driver.findElement(this.runTestButton);
    await this.driver.executeScript("arguments[0].click();", element);
  }

  async waitForTestToComplete(timeout = 300000) { // até 5 minutos
    const pollInterval = 2000;
    const deadline = Date.now() + timeout;

    while (Date.now() < deadline) {
      try {
        const elements = await this.driver.findElements(
          By.xpath("//h4[text()='Result']")
        );

        if (elements.length > 0) {
          const visible = await elements[0].isDisplayed();
          if (visible) return;
        }

      } catch (err) {
        if (err.name !== "StaleElementReferenceError") {
          console.log("Erro ignorado no polling:", err);
        }
      }

      await this.driver.sleep(pollInterval);
    }

    throw new Error("O System Check não terminou após 5 minutos");
  }

  async verifyResultScreen() {
    const el = await this.driver.wait(
      until.elementLocated(By.xpath("//h4[text()='Result']")),
      60000
    );
    await this.driver.wait(until.elementIsVisible(el), 20000);
  }
}

module.exports = SystemCheckPage;
