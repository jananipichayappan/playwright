const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/results.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
};

reporter.generate(options);
