require("chromedriver");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");

let driver = null;

async function getDriver() {
  if (!driver) {
    const options = new chrome.Options();

    // NÃO USAR user-data-dir ao testar câmera/microfone
    // options.addArguments(`--user-data-dir=${path.resolve("chrome-profile")}`);

    // Fake camera/mic (funciona no Windows)
    options.addArguments("--use-fake-ui-for-media-stream");
    options.addArguments("--use-fake-device-for-media-stream");
    options.addArguments("--use-fake-video-capture=fake.y4m");
    options.addArguments("--use-fake-audio-capture=fake.wav");

    // EVITA crash
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--disable-gpu");
    options.addArguments("--disable-software-rasterizer");

    // Tamanho da janela
    options.addArguments("--window-size=1920,1080");

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
