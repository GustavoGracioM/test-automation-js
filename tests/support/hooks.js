const { Before } = require("@cucumber/cucumber");

Before(async function () {
  await this.init();
});
