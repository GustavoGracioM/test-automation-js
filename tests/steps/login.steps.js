const { Given, When, Then } = require("@cucumber/cucumber");

Given("estou na página de login", async function () {
  await this.loginPage.open();
});

When("faço login com usuário {string} e senha {string}", async function (email, senha) {
  await this.loginPage.fillEmailAndPassword(email, senha);
});

When("clico em Next", async function () {
  await this.loginPage.clickNext();
  await this.driver.sleep(3000); // aguarda a tela carregar
});

Then("o dropdrowMenu deve ser visivel", async function () {
  await this.loginPage.dropdrowMenuVerify();
});


