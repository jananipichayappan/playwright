import {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
  ITestStepHookParameter,
} from '@cucumber/cucumber';
import logger from './logger'; // Import the logger
import { Browser, Page, chromium } from 'playwright';
import * as path from 'path';
import { setDefaultTimeout } from '@cucumber/cucumber';

let browser: Browser;
export let page: Page;

// Set default timeout for tests
setDefaultTimeout(60000);

// Hook that runs before each scenario
Before(async function (scenario) {
  logger.info(`${scenario.pickle.name}`);
});

// Hook that runs after each scenario
After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    logger.error(`Scenario "${scenario.pickle.name}" failed`);
  } else {
    logger.info(`Scenario "${scenario.pickle.name}" passed`);
  }

  // Close the browser after each scenario
  await browser.close();
});

// Hook that runs before each step
BeforeStep(async function (step: ITestStepHookParameter) {
  logger.info(`Starting step: ${step.pickle.name}`); // Access the step text using `step.pickle.name`
});

// Hook that runs after each step
AfterStep(async function (step: ITestStepHookParameter) {
  if (step.result?.status === Status.FAILED) {
    logger.error(`Step "${step.pickle.name}" failed`); // Access the step text using `step.pickle.name`
  } else {
    logger.info(`Step "${step.pickle.name}" passed`);
  }
});

// Before hook to launch the browser and set up Playwright
Before(async function () {
  // Set path to Google Chrome (ensure you use the correct path for your OS)
  const chromePath = path.join(
    'C:',
    'Program Files',
    'Google',
    'Chrome',
    'Application',
    'chrome.exe',
  );

  // Launch Google Chrome in headed mode
  browser = await chromium.launch({
    headless: false, // Change to true if you want headless
    executablePath: chromePath, // Use the executable path of Google Chrome
    // slowMo: 1000, // Optional: slow down actions for better visibility
  });

  // Create a new page for each scenario
  page = await browser.newPage();
});
