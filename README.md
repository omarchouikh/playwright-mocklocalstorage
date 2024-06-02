# playwright-mocklocalstorage

This repo is mocking local data storage

## Prerequisites

- Node 20 or above installed
- Playwright installed

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/omarchouikh/playwright-mocklocalstorage.git
   cd playwright-mocklocalstorage
   ```

2. Install dependencies:

   ```sh
   npm i
   ```

## Running the Test

To execute the test, run the following command:

    
    npx playwright test
    

## Test Description

The test script performs the following steps:

- Navigate to the Base URL: Opens the base URL of the application and mock the data local storage.
- Check Search History Display: Executes a function checkSearchHistoryIsDisplayed to verify if the search history is displayed correctly.
- Wait for Destination Input Autocomplete: Ensures the destination input autocomplete element is present.
- Set Local Storage: Stores search parameters in the local storage of the browser.
- Reload Page: Reloads the page to apply the changes.
- Verify Search History: Checks if the search history is visible and contains the correct information.

## Notes

- Ensure the destinationSearchInputTID, userHistoryitems, userHistoryHeader, and userHistoryClearButton variables match the test IDs used in your application.
- Adjust the timeout values if necessary based on your application's performance.

Enjoy :D
