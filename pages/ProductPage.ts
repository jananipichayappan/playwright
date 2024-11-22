import { Page, expect } from '@playwright/test';
import { page } from '../support/hooks';
import { ENV } from '../envConfig';
import axios from 'axios';

export class ProductPage {
  constructor(page: Page) {
    page = page;
  }

  async navigateProductPage() {
    await page.goto(ENV.BASE_URL);
  }

  async searchTerm(searchTerm: string) {
    // Clicks on the search label to focus on the search input field
    await page.getByLabel('Search', { exact: true }).click();

    // Locates the search input field by its role and name
    const search = page.getByRole('searchbox', { name: 'Search input' });

    // Fills the search input field with the provided 'searchTerm'
    await search.fill(searchTerm);

    // Clicks on the search input field (optional, but can help trigger some events in the UI)
    await search.click();

    // Presses 'Enter' to submit the search term
    await search.press('Enter');
  }


  async verifySearchWord(term: string) {
    await expect(
      page
        .locator('h1.chakra-heading')
        .filter({ hasText: `Search results for "${term}"` })
        .first(),
    ).toBeVisible();
  }

  async clickSkill() {
    await page.getByRole('button', { name: 'Skill', exact: true }).click();
  }

  async addAndVerifySearchWord(skill: string) {
    // Locates the placeholder element where the user selects a skill
    const placeholder = page.locator('#react-select-select-instance-skill-placeholder');

    // Clicks on the placeholder to open the skill dropdown
    await placeholder.click();

    // Fills the input field inside the dropdown with the provided 'skill' value
    await page.locator('input[role="combobox"]').fill(skill);

    // Clicks on the first available option in the skill dropdown
    await page.locator('#react-select-select-instance-skill-listbox div').first().click();

    // Locates the element that contains the selected skill and verifies if it is visible on the page
    const skillElement = page
      .locator('[id="accordion-panel-\\:Riqksrlajl5t6\\:"] div')
      .filter({ hasText: skill });  // Filters by the skill name to ensure correct skill is selected

    // Asserts that the selected skill is visible in the UI
    await expect(skillElement).toBeVisible();
  }


  async verifyErrorMessage(expectedMessage: string) {
    try {
      // First, try to find the message with getByText and exact match
      const errorMessageLocator = await page.getByText(expectedMessage, {
        exact: true,
      });
      await expect(errorMessageLocator).toBeVisible();
    } catch (error) {
      console.log(
        `First attempt with getByText failed. Error: ${error}. Trying with locator...`,
      );

      // If the first method fails, fall back to using locator with 'has-text'
      const errorMessageLocator = page.locator(
        'h2:has-text("' + expectedMessage + '")',
      );
      await expect(errorMessageLocator).toBeVisible();
    }
  }

  async addAndVerifySearchWordAPI(skill: string) {
    const baseUrl = 'https://www.udacity.com/_next/data/2c1c2d8c-c1e1-4f50-a78a-01e314ea4387_8e5093e3/default/catalog/all/any-price/any-school/any-skill/any-difficulty/any-duration/any-type/relevance/page-1.json';
    const response = await axios.get(baseUrl, {
      params: {
        searchValue: skill, // Passing 'searchValue' dynamically through params
        parameters: [
          'all',
          'any-price',
          'any-school',
          'any-skill',
          'any-difficulty',
          'any-duration',
          'any-type',
          'relevance',
          'page-1',
        ],
      },
    });
    
    const skillFound = response.data.pageProps.skillUIfiler.some((item: any) =>
      item.includes(skill)
    );
    expect(skillFound).toHaveValue(skill);
  }
}
