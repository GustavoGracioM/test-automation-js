# Test Automation (Cucumber-js + Selenium)

Estrutura do projeto pronta para rodar localmente e no Azure DevOps.

## Como usar

1. `npm install`
2. `npm test`

## Estrutura
```
tests/
 ├── features/
 │     login.feature
 ├── steps/
 │     login.steps.js
 ├── pages/
 │     BasePage.js
 │     LoginPage.js
 ├── support/
 │     driver.js
 │     hooks.js
 │     world.js
package.json
azure-pipelines.yml
```

## Observações
- Ajuste as URLs e IDs dos elementos conforme sua aplicação.
- Para executar no Azure DevOps, coloque o repositório no Azure Repos/GitHub e aponte o pipeline.
