const fs = require("fs");
const cucumberJunit = require("cucumber-junit");

// Lê o JSON como texto bruto
const jsonRaw = fs.readFileSync("./reports/cucumber-report.json", "utf-8");

// Converte para formato JUnit
const xml = cucumberJunit(jsonRaw);

// Salva o arquivo .xml
fs.writeFileSync("./reports/junit-report.xml", xml);

console.log("JUnit report generated at ./reports/junit-report.xml");
