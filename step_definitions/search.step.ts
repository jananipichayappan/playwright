import { Given, When, Then } from '@cucumber/cucumber';
import { ProductPage } from '../pages/ProductPage';
import { page } from '../support/hooks';

const productPage = new ProductPage(page);

Given('I navigate to the product page', async function () {
  const productPage = new ProductPage(page);
  await productPage.navigateProductPage();
});

When('I search for the term {string}', async function (searchTerm: string) {
  await productPage.searchTerm(searchTerm);
});

When(
  'I should see search results for the term {string}',
  async function (term: string) {
    await productPage.verifySearchWord(term);
  },
);

When('I click on the {string} filter', async function (filterName: string) {
  if (filterName === 'Skill') {
    await productPage.clickSkill();
  }
});

When('I add and verify the skill {string}', async function (skill: string) {
  await productPage.addAndVerifySearchWord(skill);
  await productPage.addAndVerifySearchWordAPI(skill);
});

When('I search for an invalid term {string}', async function (term: string) {
  await productPage.searchTerm(term);
});

Then(
  'I should see the error message {string}',
  async function (message: string) {
    await productPage.verifyErrorMessage(message);
  },
);
