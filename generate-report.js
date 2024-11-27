const fs = require('fs');
const path = require('path');
const reporter = require('cucumber-html-reporter');

// Define paths for the reports
const jsonReportPath = path.resolve(__dirname, 'reports', 'cucumber_report.json');
const htmlReportPath = path.resolve(__dirname, 'reports', 'cucumber_report.html');

// Check if the JSON report file exists
if (fs.existsSync(jsonReportPath)) {
  console.log(`Cucumber JSON report generated successfully at: ${jsonReportPath}`);

  // Configure HTML report generation
  const options = {
    theme: 'bootstrap', // Theme for the HTML report
    jsonFile: jsonReportPath, // Path to the JSON report
    output: htmlReportPath, // Path where the HTML report will be generated
    reportSuiteAsScenarios: true, // Show each scenario in the report
    launchReport: true, // Launch the HTML report in the browser automatically after generating it
  };

  // Generate the HTML report
  reporter.generate(options);
} else {
  console.error('Failed to generate cucumber JSON report. Please check if the tests have run correctly.');
}
