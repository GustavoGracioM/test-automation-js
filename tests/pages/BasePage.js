const { By, until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async find(locator, timeout = 20000) {
    await this.driver.wait(
      until.elementLocated(locator),
      timeout,
      `Elemento não encontrado: ${locator}`
    );

    const element = await this.driver.findElement(locator);

    await this.driver.wait(
      until.elementIsVisible(element),
      timeout,
      `Elemento não visível: ${locator}`
    );

    return element;
  }

  async type(locator, text) {
    const element = await this.find(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  async click(locator) {
    const element = await this.find(locator);
    await element.click();
  }
}

module.exports = BasePage;
