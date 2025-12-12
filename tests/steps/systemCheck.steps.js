const { Given, When, Then } = require("@cucumber/cucumber");
const SystemCheckPage = require("../pages/SystemCheckPage");

Given(
  "estou logado com usuário {string} e senha {string}",
  async function (email, senha) {
   // await this.loginPage.open();
    //await this.loginPage.fillEmailAndPassword(email, senha);
    //await this.loginPage.clickNext();
    await this.loginPage.dropdrowMenuVerify();
  }
);

When("acesso a página System Check", async function () {
  this.systemCheckPage = new SystemCheckPage(this.driver);
  await this.systemCheckPage.open();
});

Then("o título 'System Check' deve estar visível", async function () {
  await this.systemCheckPage.verifyTitleVisible();
});

When("seleciono o técnico {string}", async function (type) {
  await this.systemCheckPage.selectTechnician(type);
});

When("inicio o System Check", async function () {
  await this.systemCheckPage.clickRunTest();
});

Then("o teste é concluído e a tela de resultado é exibida", async function () {
  await this.systemCheckPage.waitForTestToComplete();
  await this.systemCheckPage.verifyResultScreen();
});
