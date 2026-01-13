import { test, expect } from '@playwright/test';
import StudioPage from '../../../../studio.page.js';
import TaxLabelDefaultsSpec, { getLocaleTaxLabels } from '../specs/tax-label-defaults.spec.js';

const { features } = TaxLabelDefaultsSpec;

test.describe('M@S Studio ACOM Plans Tax Label Defaults test suite', () => {
    // @studio-plans-tax-label-defaults - Validate tax labels for all 4 price segments
    test(`${features[0].name}, ${features[0].tags}`, async ({ browser, baseURL }) => {
        test.setTimeout(600000); // 10 minutes for all countries

        const { data } = features[0];
        const { locales, cardid } = data;

        // Create a browser context for all pages
        const context = await browser.newContext({
            extraHTTPHeaders: { 'sec-ch-ua': '"Chromium";v="123", "Not:A-Brand";v="8"' },
        });

        // Create test configurations: one per locale
        const testConfigs = locales.map((locale) => ({
            locale,
        }));

        // Run all tests in parallel
        const results = await Promise.allSettled(
            testConfigs.map(async ({ locale }) => {
                // Extract country from locale for error reporting (e.g., 'en_CA' -> 'CA')
                const country = locale.split('_')[1] || 'Unknown';
                const page = await context.newPage();
                const errors = [];

                try {
                    // Construct studio URL with locale and cardid (no miloLibs needed)
                    const browserParams = `#locale=${locale}&page=content&path=nala&query=`;
                    const testPage = `${baseURL}${features[0].path}${browserParams}${cardid}`;

                    // Print the complete test URL
                    // console.log(`\nTesting locale ${locale}`);
                    // console.log(`Full URL: ${testPage}`);

                    await page.goto(testPage, { waitUntil: 'domcontentloaded', timeout: 30000 });
                    await page.waitForLoadState('domcontentloaded');
                    
                    // Wait a bit for the page to initialize
                    await page.waitForTimeout(1000);

                    // Create studio page object and get the card
                    const studio = new StudioPage(page);
                    let card = await studio.getCard(cardid);

                    // Try to wait for card, reload if not found
                    try {
                        await expect(card).toBeVisible({ timeout: 10000 });
                    } catch (error) {
                        // Card not found, reload and try again
                        // console.log(`Card not found for ${locale}, reloading page...`);
                        await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
                        await page.waitForLoadState('domcontentloaded');
                        await page.waitForTimeout(2000);
                        card = await studio.getCard(cardid);
                        await expect(card).toBeVisible({ timeout: 30000 });
                    }

                    // Wait for commerce elements to load within the card
                    try {
                        // Wait for price elements within the card context
                        await card.locator('span[is="inline-price"]').first().waitFor({ state: 'visible', timeout: 20000 });

                        // Wait for placeholders to be resolved within the card
                        await page.waitForFunction(
                            (cardId) => {
                                const cardElement = document.querySelector(
                                    `merch-card:has(aem-fragment[fragment="${cardId}"])`,
                                );
                                if (!cardElement) return false;
                                const placeholders = cardElement.querySelectorAll('[data-wcs-osi]');
                                return (
                                    placeholders.length > 0 &&
                                    Array.from(placeholders).some((el) => el.classList.contains('placeholder-resolved'))
                                );
                            },
                            cardid,
                            { timeout: 20000 },
                        );
                    } catch (error) {
                        errors.push(
                            `No commerce elements found on page (no commerce elements visible and no placeholders resolved): ${error.message}`,
                        );
                    }

                    await page.waitForTimeout(2000);

                    // Get expected tax labels for this locale (locale-based mapping)
                    let expectedLabels = getLocaleTaxLabels(locale);

                    // If locale is not in mapping, expect no labels for all 4 segments
                    if (!expectedLabels) {
                        expectedLabels = [null, null, null, null];
                    }

                    // Find all prices within the card - they should be in order: INDIVIDUAL_COM, TEAM_COM, INDIVIDUAL_EDU, TEAM_EDU
                    const allPrices = await card.locator('span[is="inline-price"]').all();
                    const segmentNames = ['INDIVIDUAL_COM', 'TEAM_COM', 'INDIVIDUAL_EDU', 'TEAM_EDU'];
                    const priceCount = allPrices.length;

                    // Check for placeholder-failed or placeholder-rejected states and collect price states
                    const priceStates = [];
                    for (let i = 0; i < Math.min(priceCount, 4); i++) {
                        const priceElement = allPrices[i];
                        const placeholderState = await priceElement.evaluate((el) => {
                            if (el.classList.contains('placeholder-failed')) return 'placeholder-failed';
                            if (el.classList.contains('placeholder-rejected')) return 'placeholder-rejected';
                            return null;
                        });
                        priceStates[i] = placeholderState;
                        if (placeholderState) {
                            errors.unshift(`Segment ${segmentNames[i]} (${locale}): Price has ${placeholderState} state`);
                        }
                    }

                    // Verify that exactly 4 prices are displayed
                    if (priceCount !== 4) {
                        if (priceCount < 4) {
                            const missingSegments = segmentNames.slice(priceCount);
                            errors.unshift(
                                `Missing ${4 - priceCount} price(s). Found ${priceCount} price(s), missing segments: ${missingSegments.join(', ')}`,
                            );
                        } else {
                            errors.unshift(`Expected exactly 4 prices, but found ${priceCount} prices`);
                        }
                    }

                    // Check tax labels for each price that exists and is not in failed/rejected state
                    for (let i = 0; i < Math.min(priceCount, 4); i++) {
                        // Skip tax label validation if price is in failed/rejected state
                        if (priceStates[i]) {
                            continue;
                        }

                        const expectedLabel = expectedLabels[i];
                        const priceElement = allPrices[i];
                        const taxLabelElement = priceElement.locator('.price-tax-inclusivity:not(.disabled)');
                        const taxLabelExists = (await taxLabelElement.count()) > 0;

                        if (expectedLabel === null || expectedLabel === '-') {
                            if (taxLabelExists) {
                                const actualLabel = await taxLabelElement.textContent();
                                errors.push(
                                    `Segment ${segmentNames[i]} (${locale}): Expected no tax label, but found "${actualLabel.trim()}"`,
                                );
                            }
                        } else {
                            if (!taxLabelExists) {
                                errors.push(
                                    `Segment ${segmentNames[i]} (${locale}): Expected tax label "${expectedLabel}", but no tax label found`,
                                );
                            } else {
                                const actualLabel = await taxLabelElement.textContent();
                                if (actualLabel.trim() !== expectedLabel.trim()) {
                                    errors.push(
                                        `Segment ${segmentNames[i]} (${locale}): Expected tax label "${expectedLabel}", but found "${actualLabel.trim()}"`,
                                    );
                                }
                            }
                        }
                        
                        // Check unit text: TEAM prices (indices 1 and 3) should have unit text, INDIVIDUAL prices (indices 0 and 2) should not
                        const isTeamPrice = i === 1 || i === 3; // TEAM_COM or TEAM_EDU
                        const unitTextElement = priceElement.locator('.price-unit-type');
                        const unitTextExists = (await unitTextElement.count()) > 0;
                        const unitText = unitTextExists ? await unitTextElement.textContent() : '';
                        
                        if (isTeamPrice) {
                            // TEAM prices should have unit text
                            if (!unitTextExists || unitText.trim() === '') {
                                errors.push(
                                    `Segment ${segmentNames[i]} (${locale}): Expected unit text to be displayed for TEAM price, but no unit text found`,
                                );
                            }
                        } else {
                            // INDIVIDUAL prices should NOT have unit text
                            if (unitTextExists && unitText.trim() !== '') {
                                errors.push(
                                    `Segment ${segmentNames[i]} (${locale}): Expected no unit text for INDIVIDUAL price, but found "${unitText.trim()}"`,
                                );
                            }
                        }
                    }
                } catch (error) {
                    errors.push(`Error during test execution: ${error.message || String(error)}`);
                } finally {
                    await page.close();
                }

                return { cardid, locale, errors };
            }),
        );

        // Collect failures
        const allResults = [];
        results.forEach((result, index) => {
            const config = testConfigs[index];
            if (result.status === 'rejected') {
                allResults.push({
                    cardid,
                    locale: config.locale,
                    errors: [`Promise rejected: ${result.reason?.message || String(result.reason)}`],
                });
            } else if (result.value && result.value.errors.length > 0) {
                allResults.push(result.value);
            }
        });

        // Close the context
        await context.close();

        // Report all failures at the end
        if (allResults.length > 0) {
            const failureReport = allResults
                .map((failure, index) => {
                    const errorList = failure.errors.map((err, i) => `    ${i + 1}. ${err}`).join('\n');
                    return `${index + 1}. cardid=${failure.cardid}, locale=${failure.locale}:\n${errorList}`;
                })
                .join('\n\n');

            const totalConfigs = testConfigs.length;
            throw new Error(
                `\n=== FAILURES SUMMARY ===\n\n${failureReport}\n\nTotal: ${allResults.length} out of ${totalConfigs} configurations failed\n`,
            );
        }
    });
});
