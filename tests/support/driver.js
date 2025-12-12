require("chromedriver");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = null;

async function getDriver() {
  if (!driver) {
    const options = new chrome.Options();

    // Permissões Feitas via Fake Devices
    options.addArguments("--use-fake-ui-for-media-stream");
    options.addArguments("--use-fake-device-for-media-stream");
    options.addArguments("--use-fake-video-capture=fake.y4m");
    options.addArguments("--use-fake-audio-capture=fake.wav");

    // Evitar travas do Chrome
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--disable-gpu");
    options.addArguments("--disable-software-rasterizer");
    options.addArguments("--window-size=1920,1080");

    options.addArguments("--start-maximized");
    options.addArguments("--kiosk");

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
