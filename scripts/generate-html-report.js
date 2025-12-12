const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonFile = path.resolve('./reports/cucumber-report.json');

if (!fs.existsSync(jsonFile)) {
  console.error('JSON report not found:', jsonFile);
  process.exit(1);
}

const options = {
  theme: 'bootstrap',
  jsonFile: jsonFile,
  output: './reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "CI",
    "Browser": "Chrome"
  }
};

reporter.generate(options);
