// Importing necessary modules from Playwright
import { test, expect } from '@playwright/test';

// Define a test with the name 'get started link'
test('get started link', async ({ page }) => {
  const destinationSearchInputTID = '.locator'
  const userHistoryitems = '.locator'
  const userHistoryHeader = '.locator'
  const userHistoryClearButton = '.locator'

  // Navigate to the base URL
  await page.goto('/');

  // Call the function to check if the search history is displayed with specified parameters
  await checkSearchHistoryIsDisplayed('City, Country', '1');

  // Define an asynchronous function to check if the search history is displayed
  async function checkSearchHistoryIsDisplayed(destinationHistory, adultNumber) {
    // Wait for the destination input autocomplete element to be present in the DOM
    await page.getByTestId('destination-input-autocomplete').waitFor();

    // Use page.evaluate to execute JavaScript code within the browser context
    await page.evaluate(
      ({ destinationHistory, adultNumber }) => {
        // Get the current date and time as a string
        const currentDate = new Date().toLocaleString();

        // Set the local storage item 'user_history' with the search parameters
        localStorage.setItem(
          'user_history',
          JSON.stringify([
            {
              createdAt: currentDate,
              data: {
                'search.dayIn': '29',
                'search.monthIn': '5',
                'search.yearIn': '2024',
                'search.dayOut': '30',
                'search.monthOut': '5',
                'search.yearOut': '2024',
                'search.destination': destinationHistory,
                'search.destination.code': '#####################',
                'search.destination.slug': 'test-test',
                'search.destination.type': '######',
                'search.destination.label_en': destinationHistory,
                'search.destination.labelSelected': destinationHistory,
                'search.geoZone.geoZoneCode': '#####################',
                'search.geoZone.geoZoneType': '#####',
                'search.geoZone.location.latitude': '33.97159',
                'search.geoZone.location.longitude': '-6.849813',
                'search.radius.unit': 'KM',
                'search.radius.value': '9087.634',
                'search.viewport.northeast.lat': '34.06781',
                'search.viewport.northeast.lng': '-6.758832',
                'search.viewport.southwest.lat': '33.870628',
                'search.viewport.southwest.lng': '-6.955694',
                'search.roomNumber': '1',
                'search.roomCriteria[0].adultNumber': adultNumber,
              },
            },
          ]),
        );
      },
      { destinationHistory, adultNumber },
    );

    // Reload the page to apply changes
    await page.reload();

    // Wait for the destination search input element to be present in the DOM
    await page.getByTestId(destinationSearchInputTID).waitFor();

    // Click on the destination search input element
    await page.getByTestId(destinationSearchInputTID).click();

    // Wait for the first user history item to be visible within a 30-second timeout
    await page.locator(userHistoryitems).first().waitFor({ state: 'visible', timeout: 30_000 });

    // Assert that the user history header is visible
    await expect(page.locator(userHistoryHeader)).toBeVisible();

    // Assert that the user history clear button is visible
    await expect(page.getByTestId(userHistoryClearButton)).toBeVisible();

    // Assert that the first user history item contains the destination history text
    await expect(page.locator(userHistoryitems).first()).toContainText(destinationHistory);

    // Assert that the first user history item contains the adult number text
    await expect(page.locator(userHistoryitems).first()).toContainText(adultNumber);
  }
});
