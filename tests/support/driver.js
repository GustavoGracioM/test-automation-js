require("chromedriver");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");

let driver = null;

async function getDriver() {
  if (!driver) {
    const options = new chrome.Options();

    // Diretório de perfil persistente
    const userDataDir = path.resolve("chrome-profile");
    options.addArguments(`--user-data-dir=${userDataDir}`);

    // Permitir câmera e microfone automaticamente
    options.addArguments("--use-fake-device-for-media-stream");
    options.addArguments("--use-fake-ui-for-media-stream");

    // Outras configs úteis
    options.addArguments("--disable-infobars");
    options.addArguments("--disable-extensions");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  }
  return driver;
}

async function quitDriver() {
  if (driver) {
    await driver.quit();
    driver = null;
  }
}

module.exports = { getDriver, quitDriver };
