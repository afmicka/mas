import { expect, test } from '@playwright/test';
import StudioPage from '../../../../studio.page.js';
import EditorPage from '../../../../editor.page.js';
import ACOMPlansIndividualsSpec from '../specs/individuals_edit.spec.js';
import ACOMPlansIndividualsPage from '../individuals.page.js';
import AHTryBuyWidgetPage from '../../../../ahome/try-buy-widget/try-buy-widget.page.js';
import CCDSlicePage from '../../../../ccd/slice/slice.page.js';
import CCDSuggestedPage from '../../../../ccd/suggested/suggested.page.js';
import OSTPage from '../../../../ost.page.js';
import WebUtil from '../../../../../libs/webutil.js';

const { features } = ACOMPlansIndividualsSpec;
const miloLibs = process.env.MILO_LIBS || '';

let studio;
let editor;
let individuals;
let ost;
let webUtil;
let suggested;
let slice;
let trybuywidget;

test.beforeEach(async ({ page, browserName }) => {
    test.slow();
    if (browserName === 'chromium') {
        await page.setExtraHTTPHeaders({
            'sec-ch-ua': '"Chromium";v="123", "Not:A-Brand";v="8"',
        });
    }
    studio = new StudioPage(page);
    editor = new EditorPage(page);
    individuals = new ACOMPlansIndividualsPage(page);
    ost = new OSTPage(page);
    webUtil = new WebUtil(page);
    suggested = new CCDSuggestedPage(page);
    slice = new CCDSlicePage(page);
    trybuywidget = new AHTryBuyWidgetPage(page);
});

test.describe('M@S Studio ACOM Plans Individuals card test suite', () => {
    // @studio-plans-individuals-edit-variant-change-to-suggested - Validate variant change for plans individuals card to suggested in mas studio
    test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
        const { data } = features[0];
        const testPage = `${baseURL}${features[0].path}${miloLibs}${features[0].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'plans');
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Change variant', async () => {
            await expect(await editor.variant).toBeVisible();
            await expect(await editor.variant).toHaveAttribute('default-value', 'plans');
            await editor.variant.locator('sp-picker').first().click();
            await page.getByRole('option', { name: 'suggested' }).click();
            await page.waitForTimeout(2000);
        });

        await test.step('step-4: Validate editor fields rendering after variant change', async () => {
            await expect(await editor.variant).toHaveAttribute('default-value', 'ccd-suggested');
            await expect(await editor.size).not.toBeVisible();
            await expect(await editor.title).toBeVisible();
            await expect(await editor.subtitle).toBeVisible();
            await expect(await editor.badge).toBeVisible();
            await expect(await editor.description).toBeVisible();
            await expect(await editor.iconURL).toBeVisible();
            await expect(await editor.backgroundImage).toBeVisible();
            await expect(await editor.prices).toBeVisible();
            await expect(await editor.footer).toBeVisible();
            await expect(await editor.whatsIncludedLabel).not.toBeVisible();
            await expect(await editor.promoText).not.toBeVisible();
            await expect(await editor.callout).not.toBeVisible();
            await expect(await editor.showAddOn).not.toBeVisible();
            await expect(await editor.showQuantitySelector).not.toBeVisible();
            await expect(await editor.OSI).toBeVisible();
        });

        await test.step('step-5: Validate new variant of the card', async () => {
            await expect(await studio.getCard(data.cardid)).not.toHaveAttribute('variant', 'plans');
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'ccd-suggested');
            await expect(await suggested.cardTitle).toBeVisible();
            await expect(await suggested.cardDescription).toBeVisible();
            await expect(await suggested.cardPrice).toBeVisible();
            await expect(await suggested.cardIcon).toBeVisible();
            await expect(await individuals.cardWhatsIncluded).not.toBeVisible();
            await expect(await individuals.cardPromoText).not.toBeVisible();
            await expect(await individuals.cardCallout).not.toBeVisible();
            await expect(await individuals.cardStockCheckbox).not.toBeVisible();
            await expect(await individuals.cardQuantitySelector).not.toBeVisible();
            await expect(await individuals.cardSecureTransaction).not.toBeVisible();
        });
    });

    // @studio-plans-individuals-edit-variant-change-to-slice - Validate variant change for plans individuals card to slice in mas studio
    test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
        const { data } = features[1];
        const testPage = `${baseURL}${features[1].path}${miloLibs}${features[1].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'plans');
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Change variant', async () => {
            await expect(await editor.variant).toBeVisible();
            await expect(await editor.variant).toHaveAttribute('default-value', 'plans');
            await editor.variant.locator('sp-picker').first().click();
            await page.getByRole('option', { name: 'slice' }).click();
            await page.waitForTimeout(2000);
        });

        await test.step('step-4: Validate editor fields rendering after variant change', async () => {
            await expect(await editor.variant).toHaveAttribute('default-value', 'ccd-slice');
            await expect(await editor.size).toBeVisible();
            await expect(await editor.title).not.toBeVisible();
            await expect(await editor.subtitle).not.toBeVisible();
            await expect(await editor.badge).toBeVisible();
            await expect(await editor.description).toBeVisible();
            await expect(await editor.iconURL).toBeVisible();
            await expect(await editor.backgroundImage).toBeVisible();
            await expect(await editor.prices).not.toBeVisible();
            await expect(await editor.footer).toBeVisible();
            await expect(await editor.whatsIncludedLabel).not.toBeVisible();
            await expect(await editor.promoText).not.toBeVisible();
            await expect(await editor.callout).not.toBeVisible();
            await expect(await editor.showAddOn).not.toBeVisible();
            await expect(await editor.showQuantitySelector).not.toBeVisible();
            await expect(await editor.OSI).toBeVisible();
        });

        await test.step('step-5: Validate new variant of the card', async () => {
            await expect(await studio.getCard(data.cardid)).not.toHaveAttribute('variant', 'plans');
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'ccd-slice');

            await expect(await individuals.cardTitle).not.toBeVisible();
            await expect(await slice.cardDescription).toBeVisible();
            await expect(await slice.cardPrice).not.toBeVisible();
            await expect(await slice.cardIcon).toBeVisible();
            await expect(await individuals.cardWhatsIncluded).not.toBeVisible();
            await expect(await individuals.cardPromoText).not.toBeVisible();
            await expect(await individuals.cardCallout).not.toBeVisible();
            await expect(await individuals.cardStockCheckbox).not.toBeVisible();
            await expect(await individuals.cardQuantitySelector).not.toBeVisible();
            await expect(await individuals.cardSecureTransaction).not.toBeVisible();
        });
    });

    // @studio-plans-individuals-edit-variant-change-to-trybuywidget - Validate variant change for plans individuals card to try-buy-widget in mas studio
    test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
        const { data } = features[2];
        const testPage = `${baseURL}${features[2].path}${miloLibs}${features[2].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'plans');
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Change variant', async () => {
            await expect(await editor.variant).toBeVisible();
            await expect(await editor.variant).toHaveAttribute('default-value', 'plans');
            await editor.variant.locator('sp-picker').first().click();
            await page.getByRole('option', { name: 'try buy widget' }).click();
            await page.waitForTimeout(2000);
        });

        await test.step('step-4: Validate editor fields rendering after variant change', async () => {
            await expect(await editor.variant).toHaveAttribute('default-value', 'ah-try-buy-widget');
            await expect(await editor.size).toBeVisible();
            await expect(await editor.title).toBeVisible();
            await expect(await editor.subtitle).not.toBeVisible();
            await expect(await editor.badge).toBeVisible();
            await expect(await editor.description).toBeVisible();
            await expect(await editor.iconURL).toBeVisible();
            await expect(await editor.backgroundImage).toBeVisible();
            await expect(await editor.borderColor).toBeVisible();
            await expect(await editor.backgroundColor).toBeVisible();
            await expect(await editor.prices).toBeVisible();
            await expect(await editor.footer).toBeVisible();
            await expect(await editor.whatsIncludedLabel).not.toBeVisible();
            await expect(await editor.promoText).not.toBeVisible();
            await expect(await editor.callout).not.toBeVisible();
            await expect(await editor.showAddOn).not.toBeVisible();
            await expect(await editor.showQuantitySelector).not.toBeVisible();
            await expect(await editor.OSI).toBeVisible();
        });

        await test.step('step-5: Validate new variant of the card', async () => {
            await expect(await studio.getCard(data.cardid)).not.toHaveAttribute('variant', 'plans');
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'ah-try-buy-widget');
            await expect(await trybuywidget.cardTitle).toBeVisible();
            await expect(await trybuywidget.cardDescription).toBeVisible();
            await expect(await trybuywidget.cardPrice).toBeVisible();
            await expect(await trybuywidget.cardIcon).toBeVisible();
            await expect(await individuals.cardWhatsIncluded).not.toBeVisible();
            await expect(await individuals.cardPromoText).not.toBeVisible();
            await expect(await individuals.cardCallout).not.toBeVisible();
            await expect(await individuals.cardStockCheckbox).not.toBeVisible();
            await expect(await individuals.cardQuantitySelector).not.toBeVisible();
            await expect(await individuals.cardSecureTransaction).not.toBeVisible();
        });
    });

    // @studio-plans-individuals-edit-RTE-fields - Validate comprehensive field edits for plans individuals card in mas studio
    test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
        const { data } = features[3];
        const testPage = `${baseURL}${features[3].path}${miloLibs}${features[3].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'plans');
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Change title', async () => {
            await expect(await editor.title).toBeVisible();
            await expect(await editor.title).toHaveValue(data.title.old);
            await editor.title.fill(data.title.new);
        });

        await test.step('step-4: Change badge', async () => {
            await expect(await editor.badge).toBeVisible();
            await expect(await editor.badge).toHaveValue(data.badge.old);
            await editor.badge.fill(data.badge.new);
        });

        await test.step('step-5: Change description', async () => {
            await expect(await editor.description).toBeVisible();
            await expect(await editor.description).toContainText(data.description.old);
            await editor.description.fill(data.description.new);
        });

        await test.step('step-6: Change icon URL', async () => {
            await expect(await editor.iconURL).toBeVisible();
            await expect(await editor.iconURL).toHaveValue(data.iconURL.old);
            await editor.iconURL.fill(data.iconURL.new);
        });

        await test.step('step-7: Change callout text', async () => {
            await expect(await editor.calloutRTE).toBeVisible();
            await expect(await editor.calloutRTE).toContainText(data.calloutText.old);
            await editor.calloutRTE.fill(data.calloutText.new);
        });

        await test.step('step-8: Change promo text', async () => {
            await expect(await editor.promoText).toBeVisible();
            await expect(await editor.promoText).toHaveValue(data.promoText.old);
            await editor.promoText.fill(data.promoText.new);
        });

        await test.step('step-9: Add whats included text and icon', async () => {
            // Add what's included text
            await expect(await editor.whatsIncludedLabel).toBeVisible();
            await expect(await editor.whatsIncludedLabel).toHaveValue('');
            await expect(await individuals.cardWhatsIncluded).not.toBeVisible();
            await editor.whatsIncludedLabel.fill(data.whatsIncluded.text);

            // Add what's included icon
            await expect(await editor.whatsIncludedAddIcon).toBeVisible();
            await editor.whatsIncludedAddIcon.click();
            await expect(await editor.whatsIncludedIconURL).toBeVisible();
            await expect(await editor.whatsIncludedIconLabel).toBeVisible();
            await editor.whatsIncludedIconURL.fill(data.whatsIncluded.icon.url);
            await editor.whatsIncludedIconLabel.fill(data.whatsIncluded.icon.label);
        });

        await test.step('step-10: Change badge color', async () => {
            await expect(await editor.badgeColor).toBeVisible();
            await expect(await editor.badgeColor).toContainText(data.badgeColor.old);
            await editor.badgeColor.click();
            await page.getByRole('option', { name: data.badgeColor.new, exact: true }).click();
            await page.waitForTimeout(2000);
        });

        await test.step('step-11: Change badge border color', async () => {
            await expect(await editor.badgeBorderColor).toBeVisible();
            await expect(await editor.badgeBorderColor).toContainText(data.badgeBorderColor.old);
            await editor.badgeBorderColor.click();
            await page.getByRole('option', { name: data.badgeBorderColor.new, exact: true }).click();
            await page.waitForTimeout(2000);
        });

        await test.step('step-12: Change card border color', async () => {
            await expect(await editor.cardBorderColor).toBeVisible();
            await expect(await editor.cardBorderColor).toContainText(data.cardBorderColor.old);
            await editor.cardBorderColor.click();
            await page.getByRole('option', { name: data.cardBorderColor.new, exact: true }).click();
            await page.waitForTimeout(2000);
        });

        await test.step('step-13: Add phone link to description', async () => {
            await expect(await editor.descriptionFieldGroup.locator(editor.linkEdit)).toBeVisible();
            await editor.descriptionFieldGroup.locator(editor.linkEdit).click();
            await expect(editor.phoneLinkTab).toBeVisible();
            await editor.phoneLinkTab.click();
            await expect(await editor.phoneLinkText).toBeVisible();
            await expect(await editor.linkSave).toBeVisible();
            await editor.phoneLinkText.fill(data.phoneNumber);
            await editor.linkSave.click();
        });

        await test.step('step-14: Add legal disclaimer through OST', async () => {
            await expect(await editor.description).toBeVisible();
            await expect(await editor.description).not.toContainText(data.legalDisclaimer.text);
            await editor.descriptionFieldGroup.locator(editor.OSTButton).click();
            await ost.backButton.click();
            await page.waitForTimeout(2000);
            await expect(await ost.searchField).toBeVisible();
            await ost.searchField.fill(data.legalDisclaimer.osi);
            await (await ost.nextButton).click();
            await ost.legalDisclaimer.scrollIntoViewIfNeeded();
            await expect(await ost.legalDisclaimer).not.toContainText(data.legalDisclaimer.cardText);
            await expect(await ost.unitCheckbox).toBeVisible();
            await ost.unitCheckbox.click();
            await expect(await ost.legalDisclaimer).toContainText(data.legalDisclaimer.cardText);
            await expect(await ost.legalDisclaimerUse).toBeVisible();
            await ost.legalDisclaimerUse.click();
            await page.waitForTimeout(5000);
        });

        await test.step('step-15: Change OSI ', async () => {
            await expect(await editor.OSI).toBeVisible();
            await expect(await editor.OSI).toContainText(data.osi.old);
            await expect(await editor.tags).toBeVisible();
            await expect(await editor.tags).toHaveAttribute('value', new RegExp(`${data.offerTypeTag.old}`));
            await expect(await editor.tags).toHaveAttribute('value', new RegExp(`${data.marketSegmentsTag.old}`));
            await expect(await editor.tags).toHaveAttribute('value', new RegExp(`${data.planTypeTag.old}`));
            await editor.OSIButton.click();
            await ost.backButton.click();
            await page.waitForTimeout(2000);
            await expect(await ost.searchField).toBeVisible();
            await ost.searchField.fill(data.osi.new);
            await (await ost.nextButton).click();
            await expect(await ost.priceUse).toBeVisible();
            await ost.priceUse.click();
        });

        await test.step('step-16: Validate all field edits in parallel', async () => {
            const results = await Promise.allSettled([
                test.step('Validation-1: Verify title changed', async () => {
                    await expect(await editor.title).toHaveValue(data.title.new);
                    await expect(await individuals.cardTitle).toHaveText(data.title.new);
                }),

                test.step('Validation-2: Verify badge changed', async () => {
                    await expect(await editor.badge).toHaveValue(data.badge.new);
                    await expect(await individuals.cardBadge).toHaveText(data.badge.new);
                }),

                test.step('Validation-3: Verify description changed', async () => {
                    await expect(await editor.description).toContainText(data.description.new);
                    await expect(await individuals.cardDescription).toContainText(data.description.new);
                }),

                test.step('Validation-4: Verify icon changed', async () => {
                    await expect(await editor.iconURL).toHaveValue(data.iconURL.new);
                    await expect(await individuals.cardIcon).toHaveAttribute('src', data.iconURL.new);
                    await expect(await individuals.cardIcon).toBeVisible();
                }),

                test.step('Validation-5: Verify callout changed', async () => {
                    await expect(await editor.calloutRTE).toContainText(data.calloutText.new);
                    await expect(await individuals.cardCallout).toContainText(data.calloutText.new);
                }),

                test.step('Validation-6: Verify promo text changed', async () => {
                    await expect(await editor.promoText).toHaveValue(data.promoText.new);
                    await expect(await individuals.cardPromoText).toHaveText(data.promoText.new);
                }),

                test.step('Validation-7: Verify whats included added', async () => {
                    await expect(await editor.whatsIncludedLabel).toHaveValue(data.whatsIncluded.text);
                    await expect(await individuals.cardWhatsIncluded).toBeVisible();
                    await expect(await individuals.cardWhatsIncludedLabel).toHaveText(data.whatsIncluded.text);
                }),

                test.step('Validation-8: Verify whats included icon added', async () => {
                    await expect(await individuals.cardWhatsIncludedIcon).toBeVisible();
                    await expect(await individuals.cardWhatsIncludedIcon).toHaveAttribute('src', data.whatsIncluded.icon.url);
                    await expect(await individuals.cardWhatsIncludedIconLabel).toHaveText(data.whatsIncluded.icon.label);
                }),

                test.step('Validation-9: Verify badge color changed', async () => {
                    await expect(await editor.badgeColor).toContainText(data.badgeColor.new);
                    expect(
                        await webUtil.verifyCSS(await (await studio.getCard(data.cardid)).locator(individuals.cardBadge), {
                            'background-color': data.badgeColor.newCSS,
                        }),
                    ).toBeTruthy();
                }),

                test.step('Validation-10: Verify badge border color changed', async () => {
                    await expect(await editor.badgeBorderColor).toContainText(data.badgeBorderColor.new);
                    expect(
                        await webUtil.verifyCSS(await (await studio.getCard(data.cardid)).locator(individuals.cardBadge), {
                            'border-left-color': data.badgeBorderColor.newCSS,
                            'border-top-color': data.badgeBorderColor.newCSS,
                            'border-bottom-color': data.badgeBorderColor.newCSS,
                        }),
                    ).toBeTruthy();
                }),

                test.step('Validation-11: Verify card border color changed', async () => {
                    await expect(await editor.cardBorderColor).toContainText(data.cardBorderColor.new);
                    expect(
                        await webUtil.verifyCSS(await studio.getCard(data.cardid), {
                            'border-color': data.cardBorderColor.newCSS,
                        }),
                    ).toBeTruthy();
                }),

                test.step('Validation-12: Validate phone link addition', async () => {
                    await expect(await editor.description.locator(editor.phoneLink)).toHaveText(data.phoneNumber);
                    await expect(await individuals.cardPhoneLink).toHaveText(data.phoneNumber);
                }),

                test.step('Validation-13: Validate legal disclaimer updated', async () => {
                    await expect(await editor.description).toContainText(data.legalDisclaimer.text);
                    await expect(await individuals.cardDescription).toContainText(data.legalDisclaimer.cardText);
                }),

                test.step('Validation-14: Validate edited OSI and tags in Editor panel', async () => {
                    await expect(await editor.OSI).toContainText(data.osi.new);
                    await expect(await editor.tags).toHaveAttribute('value', new RegExp(`${data.planTypeTag.new}`));
                    await expect(await editor.tags).toHaveAttribute('value', new RegExp(`${data.offerTypeTag.new}`));
                    await expect(await editor.tags).toHaveAttribute('value', new RegExp(`${data.marketSegmentsTag.new}`));
                    await expect(await editor.tags).not.toHaveAttribute('value', new RegExp(`${data.offerTypeTag.old}`));
                    await expect(await editor.tags).not.toHaveAttribute('value', new RegExp(`${data.marketSegmentsTag.old}`));
                    await expect(await editor.tags).not.toHaveAttribute('value', new RegExp(`${data.planTypeTag.old}`));
                }),
            ]);

            // Check results and report any failures
            const failures = results
                .map((result, index) => ({ result, index }))
                .filter(({ result }) => result.status === 'rejected')
                .map(({ result, index }) => `Validation ${index + 1} failed: ${result.reason}`);

            if (failures.length > 0) {
                throw new Error(`Simple field validation failures:\n${failures.join('\n')}`);
            }
        });
    });

    // @studio-plans-individuals-edit-cta-link - Validate CTA link editing (label, variant, checkout params) for plans individuals card in mas studio
    test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
        const { data } = features[4];
        const testPage = `${baseURL}${features[4].path}${miloLibs}${features[4].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'plans');
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Edit CTA link properties', async () => {
            await expect(await editor.footer.locator(editor.linkEdit)).toBeVisible();
            await expect(await editor.CTA).toBeVisible();
            await expect(await editor.footer).toContainText(data.cta.label.old);
            await expect(await editor.CTA).toHaveClass(data.cta.variant.old);
            expect(await webUtil.verifyCSS(await individuals.cardCTA, data.cta.variant.oldCSS)).toBeTruthy();

            await editor.CTA.click();
            await editor.footer.locator(editor.linkEdit).click();
            await expect(await editor.linkSave).toBeVisible();

            // Edit 1: Change CTA label
            await expect(await editor.linkText).toBeVisible();
            await expect(await editor.linkText).toHaveValue(data.cta.label.old);
            await editor.linkText.fill(data.cta.label.new);

            // Edit 2: Edit CTA variant
            await expect(await editor.linkVariant).toBeVisible();
            await expect(await editor.getLinkVariant(data.cta.variant.new)).toBeVisible();
            await (await editor.getLinkVariant(data.cta.variant.new)).click();

            // Edit 3: Edit CTA checkout params
            await expect(await editor.checkoutParameters).toBeVisible();
            const checkoutParamsString = Object.keys(data.cta.checkoutParams)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data.cta.checkoutParams[key])}`)
                .join('&');
            await editor.checkoutParameters.fill(checkoutParamsString);

            await editor.linkSave.click();
        });

        await test.step('step-4: Validate all CTA link edits', async () => {
            // Validate editor panel changes
            await expect(await editor.footer).toContainText(data.cta.label.new);
            await expect(await editor.CTA).toHaveClass(data.cta.variant.new);
            await expect(await editor.CTA).not.toHaveClass(data.cta.variant.old);

            const cardCTA = await individuals.cardCTA;
            const CTAhref = await cardCTA.getAttribute('href');
            const searchParams = new URLSearchParams(decodeURI(CTAhref).split('?')[1]);

            // Validate all CTA properties
            await expect(cardCTA).toContainText(data.cta.label.new);
            await expect(cardCTA).toHaveAttribute('data-wcs-osi', data.osi);
            await expect(cardCTA).toHaveAttribute('is', 'checkout-link');

            // Validate CSS styling
            expect(await webUtil.verifyCSS(cardCTA, data.cta.variant.newCSS)).toBeTruthy();

            // Validate checkout parameters
            expect(searchParams.get('mv')).toBe(data.cta.checkoutParams.mv);
            expect(searchParams.get('promoid')).toBe(data.cta.checkoutParams.promoid);
            expect(searchParams.get('mv2')).toBe(data.cta.checkoutParams.mv2);
        });
    });

    // @studio-plans-individuals-edit-price-ost - Validate price and promo editing through OST for plans individuals card in mas studio
    test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
        const { data } = features[5];
        const testPage = `${baseURL}${features[5].path}${miloLibs}${features[5].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Edit price field and promo through OST', async () => {
            await expect(await editor.prices).toBeVisible();
            await expect(await editor.prices).toContainText(data.price.old);
            await expect(await editor.prices).not.toContainText(data.price.new);
            await expect(await editor.prices).toContainText(data.strikethroughPrice.old);
            await expect(await editor.prices).not.toContainText(data.strikethroughPrice.new);
            await expect(await editor.prices.locator(editor.promoStrikethroughPrice)).toHaveCSS(
                'text-decoration-line',
                'line-through',
            );
            await expect(await editor.prices.locator(editor.regularPrice)).toHaveAttribute(
                'data-promotion-code',
                data.promo.old,
            );
            await expect(await individuals.cardPrice).toHaveAttribute('data-promotion-code', data.promo.old);

            // Open OST
            await (await editor.prices.locator(editor.regularPrice)).dblclick();
            await expect(await ost.price).toBeVisible();
            await expect(await ost.price).toContainText(data.price.old);
            await expect(await ost.price).not.toContainText(data.price.new);
            await expect(await ost.price).toContainText(data.strikethroughPrice.old);
            await expect(await ost.price).not.toContainText(data.strikethroughPrice.new);
            await expect(await ost.pricePromoStrikethrough).toHaveCSS('text-decoration-line', 'line-through');
            await expect(await ost.priceUse).toBeVisible();
            await expect(await ost.unitCheckbox).toBeVisible();
            // Edit unit pricing
            await ost.unitCheckbox.click();
            await expect(await ost.price).toContainText(data.price.new);
            await expect(await ost.price).toContainText(data.strikethroughPrice.new);
            await expect(await ost.pricePromoStrikethrough).toHaveCSS('text-decoration-line', 'line-through');

            // Edit promo field
            await expect(await ost.promoField).toBeVisible();
            await expect(await ost.promoLabel).toBeVisible();
            await expect(await ost.promoLabel).toContainText(data.promo.old);
            await expect(await ost.promoField).toHaveValue(data.promo.old);
            await ost.promoField.fill(data.promo.new);
            await expect(await ost.promoLabel).toContainText(data.promo.new);
            await expect(await ost.promoField).toHaveValue(data.promo.new);

            await ost.priceUse.click();
        });

        await test.step('step-4: Validate price and promo edits through OST', async () => {
            // Validate promo changes in editor panel
            await expect(await editor.prices.locator(editor.regularPrice)).toHaveAttribute(
                'data-promotion-code',
                data.promo.new,
            );

            // Validate price changes in editor panel
            await expect(await editor.prices).not.toContainText(data.price.new);
            await expect(await editor.prices).toContainText(data.strikethroughPrice.new);

            // Validate card pricing
            await expect(await individuals.cardPrice).not.toContainText(data.price.new);
            await expect(await individuals.cardPrice).toContainText(data.strikethroughPrice.old);
            await expect(await individuals.cardPriceLegal).toBeVisible();
            await expect(await individuals.cardPriceLegal).toContainText(data.price.legalText);

            // Validate promo changes on card
            await expect(await individuals.cardPrice).toHaveAttribute('data-promotion-code', data.promo.new);
        });
    });

    // @studio-plans-individuals-edit-cta-ost - Validate CTA and promo editing through OST for plans individuals card in mas studio
    test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
        const { data } = features[6];
        const testPage = `${baseURL}${features[6].path}${miloLibs}${features[6].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Edit CTA and promo through OST', async () => {
            await expect(await editor.footer).toBeVisible();
            await expect(await editor.footer).toContainText(data.cta.text.old);
            await expect(await individuals.cardCTA).toHaveAttribute('data-wcs-osi', data.osi);
            await expect(await individuals.cardCTA).toHaveAttribute('is', 'checkout-link');
            await expect(await individuals.cardCTA).toHaveAttribute('data-checkout-workflow-step', data.cta.workflowStep.old);

            await expect(await editor.CTA).toHaveAttribute('data-promotion-code', data.promo.old);
            await expect(await individuals.cardCTA).toHaveAttribute('data-promotion-code', data.promo.old);

            const initialCTAhref = await individuals.cardCTA.getAttribute('href');
            const initialSearchParams = new URLSearchParams(decodeURI(initialCTAhref).split('?')[1]);
            expect(initialSearchParams.get('apc')).toBe(data.promo.old);

            // Open OST
            await (await editor.CTA).dblclick();
            await expect(await ost.checkoutTab).toBeVisible();
            await expect(await ost.workflowMenu).toBeVisible();
            await expect(await ost.ctaTextMenu).toBeEnabled();
            await expect(await ost.checkoutLink).toBeVisible();
            await expect(await ost.checkoutLinkUse).toBeVisible();
            await expect(await ost.checkoutLink).toHaveAttribute('data-checkout-workflow-step', data.cta.workflowStep.old);

            // Edit promo field
            await expect(await ost.promoField).toBeVisible();
            await expect(await ost.promoLabel).toBeVisible();
            await expect(await ost.promoLabel).toContainText(data.promo.old);
            await expect(await ost.promoField).toHaveValue(data.promo.old);
            await ost.promoField.fill(data.promo.new);
            await expect(await ost.promoLabel).toContainText(data.promo.new);
            await expect(await ost.promoField).toHaveValue(data.promo.new);

            // Edit CTA text
            await expect(async () => {
                await ost.ctaTextMenu.click();
                await expect(
                    page.locator('div[role="option"]', {
                        hasText: `${data.cta.text.newOption}`,
                    }),
                ).toBeVisible({
                    timeout: 500,
                });
            }).toPass();
            await page
                .locator('div[role="option"]', {
                    hasText: `${data.cta.text.newOption}`,
                })
                .click();

            // Edit workflow step
            await expect(async () => {
                await ost.workflowMenu.click();
                await expect(
                    page.locator('div[role="option"]', {
                        hasText: `${data.cta.workflowStep.newOption}`,
                    }),
                ).toBeVisible({
                    timeout: 500,
                });
            }).toPass();
            await page
                .locator('div[role="option"]', {
                    hasText: `${data.cta.workflowStep.newOption}`,
                })
                .click();

            await expect(await ost.checkoutLink).toHaveAttribute('data-checkout-workflow-step', data.cta.workflowStep.new);
            await ost.checkoutLinkUse.click();
        });

        await test.step('step-4: Validate CTA and promo edits through OST', async () => {
            await expect(await editor.CTA).toHaveAttribute('data-promotion-code', data.promo.new);
            await expect(await editor.footer).toContainText(data.cta.text.new);

            const cardCTA = await individuals.cardCTA;
            const CTAhref = await cardCTA.getAttribute('href');
            const searchParams = new URLSearchParams(decodeURI(CTAhref).split('?')[1]);

            // Validate all CTA properties
            await expect(cardCTA).toContainText(data.cta.text.new);
            await expect(cardCTA).toHaveAttribute('data-wcs-osi', data.osi);
            await expect(cardCTA).toHaveAttribute('is', 'checkout-link');
            await expect(cardCTA).toHaveAttribute('data-checkout-workflow-step', data.cta.workflowStep.new);
            await expect(cardCTA).toHaveAttribute('data-promotion-code', data.promo.new);

            // Validate URL parameters including promo
            const workflowStep = decodeURI(CTAhref).split('?')[0];
            expect(workflowStep).toContain(data.cta.ucv3.new);
            expect(searchParams.get('co')).toBe(data.cta.country);
            expect(searchParams.get('ctx')).toBe(data.cta.ctx);
            expect(searchParams.get('lang')).toBe(data.cta.lang);
            expect(searchParams.get('cli')).toBe(data.cta.client);
            expect(searchParams.get('apc')).toBe(data.promo.new);
        });
    });

    // @studio-plans-individuals-edit-size - Validate size editing for plans individuals card in mas studio
    test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
        const { data } = features[7];
        const testPage = `${baseURL}${features[7].path}${miloLibs}${features[7].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'plans');
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Set size to Wide', async () => {
            await expect(await editor.size).toBeVisible();
            await expect(await editor.size).toHaveAttribute('value', 'Default');
            await editor.size.click();
            await page.getByRole('option', { name: 'Wide', exact: true }).click();
            await page.waitForTimeout(2000);
        });

        await test.step('step-4: Validate size is Wide', async () => {
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('size', 'wide');
        });

        await test.step('step-5: Edit size field to super-wide', async () => {
            await editor.size.click();
            await page.getByRole('option', { name: 'Super Wide', exact: true }).click();
            await page.waitForTimeout(2000);
        });

        await test.step('step-6: Validate size changed to super-wide', async () => {
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('size', 'super-wide');
        });
    });

    // @studio-plans-individuals-edit-remove - Validate field removal for plans individuals card in mas studio
    // badge, callout, promo text, and what's included removal workflows
    test(`${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
        const { data } = features[8];
        const testPage = `${baseURL}${features[8].path}${miloLibs}${features[8].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'plans');
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step("step-3: Add what's included label (initially empty)", async () => {
            await expect(await editor.whatsIncludedLabel).toBeVisible();
            await expect(await individuals.cardWhatsIncluded).not.toBeVisible();
            await editor.whatsIncludedLabel.fill(data.whatsIncluded.text);
        });

        await test.step("step-4: Add icon to what's included", async () => {
            await expect(await editor.whatsIncludedAddIcon).toBeVisible();
            await editor.whatsIncludedAddIcon.click();

            await expect(await editor.whatsIncludedIconURL).toBeVisible();
            await expect(await editor.whatsIncludedIconLabel).toBeVisible();

            await editor.whatsIncludedIconURL.fill(data.whatsIncluded.icon.url);
            await editor.whatsIncludedIconLabel.fill(data.whatsIncluded.icon.label);
        });

        await test.step('step-5: Remove badge field', async () => {
            await expect(await editor.badge).toBeVisible();
            await editor.badge.fill('');
        });

        await test.step('step-6: Remove callout field', async () => {
            await expect(await editor.calloutRTE).toBeVisible();
            await editor.calloutRTE.click();
            await editor.calloutRTE.fill('');
        });

        await test.step('step-7: Remove promo text field', async () => {
            await expect(await editor.promoText).toBeVisible();
            await editor.promoText.fill('');
        });

        await test.step("step-8: Remove what's included label field", async () => {
            await editor.whatsIncludedLabel.fill('');
        });

        await test.step("step-9: Remove what's included icon", async () => {
            await expect(await editor.whatsIncludedIconRemoveButton).toBeVisible();
            await editor.whatsIncludedIconRemoveButton.click();
        });

        await test.step('step-10: Validate all field removals', async () => {
            const results = await Promise.allSettled([
                test.step('Verify badge removed', async () => {
                    await expect(await editor.badge).toHaveValue('');
                    await expect(await individuals.cardBadge).not.toBeVisible();
                }),

                test.step('Verify callout removed', async () => {
                    await expect(await individuals.cardCallout).not.toBeVisible();
                }),

                test.step('Verify promo text removed', async () => {
                    await expect(await editor.promoText).toHaveValue('');
                    await expect(await individuals.cardPromoText).not.toBeVisible();
                }),

                test.step("Verify what's included removed", async () => {
                    await expect(await editor.whatsIncludedLabel).toHaveValue('');
                    await expect(await editor.whatsIncludedIconURL).not.toBeVisible();
                    await expect(await editor.whatsIncludedIconLabel).not.toBeVisible();
                    await expect(await individuals.cardWhatsIncluded).not.toBeVisible();
                    await expect(await individuals.cardWhatsIncludedIcon).not.toBeVisible();
                    await expect(await individuals.cardWhatsIncludedIconLabel).not.toBeVisible();
                }),
            ]);

            // Check results and report any failures
            const failures = results
                .map((result, index) => ({ result, index }))
                .filter(({ result }) => result.status === 'rejected')
                .map(({ result, index }) => `Validation ${index + 1} failed: ${result.reason}`);

            if (failures.length > 0) {
                throw new Error(`Field removal validation failures:\n${failures.join('\n')}`);
            }
        });
    });

    // @studio-plans-individuals-edit-stock-checkbox - Validate edit stock checkbox for plans individuals card in mas studio
    test.skip(`${features[9].name},${features[9].tags}`, async ({ page, baseURL }) => {
        const { data } = features[9];
        const testPage = `${baseURL}${features[9].path}${miloLibs}${features[9].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'plans');
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Toggle stock checkbox', async () => {
            await expect(await editor.showStockCheckbox).toBeVisible();
            await expect(await editor.showStockCheckbox).toBeChecked();
            await expect(await individuals.cardStockCheckbox).toBeVisible();
            await expect(await individuals.cardStockCheckboxIcon).toBeVisible();
            await editor.showStockCheckbox.click();
        });

        await test.step('step-4: Validate stock checkbox updated', async () => {
            await expect(await editor.showStockCheckbox).not.toBeChecked();
            await expect(await editor.showStockCheckbox).toBeVisible();
            await expect(await individuals.cardStockCheckbox).not.toBeVisible();
            await expect(await individuals.cardStockCheckboxIcon).not.toBeVisible();
        });

        await test.step('step-5: Toggle back stock checkbox', async () => {
            await editor.showStockCheckbox.click();
        });

        await test.step('step-6: Validate stock checkbox updated', async () => {
            await expect(await editor.showStockCheckbox).toBeChecked();
            await expect(await editor.showStockCheckbox).toBeVisible();
            await expect(await individuals.cardStockCheckbox).toBeVisible();
            await expect(await individuals.cardStockCheckboxIcon).toBeVisible();
        });
    });

    // @studio-plans-individuals-edit-quantity-selector - Validate edit quantity selector for plans individuals card in mas studio
    test(`${features[10].name},${features[10].tags}`, async ({ page, baseURL }) => {
        const { data } = features[10];
        const testPage = `${baseURL}${features[10].path}${miloLibs}${features[10].browserParams}${data.cardid}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to MAS Studio test page', async () => {
            await page.goto(testPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Open card editor', async () => {
            await expect(await studio.getCard(data.cardid)).toBeVisible();
            await expect(await studio.getCard(data.cardid)).toHaveAttribute('variant', 'plans');
            await (await studio.getCard(data.cardid)).dblclick();
            await expect(await editor.panel).toBeVisible();
        });

        await test.step('step-3: Toggle quantity selector', async () => {
            await expect(await editor.showQuantitySelector).toBeVisible();
            await expect(await editor.showQuantitySelector).toBeChecked();
            await expect(await individuals.cardQuantitySelector).toBeVisible();
            await editor.showQuantitySelector.click();
        });

        await test.step('step-4: Validate quantity selector updated', async () => {
            await expect(await editor.showQuantitySelector).not.toBeChecked();
            await expect(await editor.showQuantitySelector).toBeVisible();
            await expect(await individuals.cardQuantitySelector).not.toBeVisible();
        });

        await test.step('step-5: Toggle back quantity selector', async () => {
            await editor.showQuantitySelector.click();
        });

        await test.step('step-6: Validate quantity selector updated', async () => {
            await expect(await editor.showQuantitySelector).toBeChecked();
            await expect(await editor.showQuantitySelector).toBeVisible();
            await expect(await individuals.cardQuantitySelector).toBeVisible();
        });

        await test.step('step-7: Edit quantity selector start value', async () => {
            await expect(await editor.quantitySelectorStart).toBeVisible();
            await expect(await editor.quantitySelectorStart).toHaveValue(data.startValue);
            await editor.quantitySelectorStart.fill(data.newStartValue);
            await expect(await editor.quantitySelectorStart).toHaveValue(data.newStartValue);
        });

        await test.step('step-8: Edit quantity selector step value', async () => {
            await expect(await editor.quantitySelectorStep).toBeVisible();
            await expect(await editor.quantitySelectorStep).toHaveValue(data.stepValue);
            await editor.quantitySelectorStep.fill(data.newStepValue);
            await expect(await editor.quantitySelectorStep).toHaveValue(data.newStepValue);
        });

        await test.step('step-10: Validate quantity selector step value on card', async () => {
            await expect(await individuals.cardQuantitySelector).toHaveAttribute('step', data.newStepValue);
            await expect(await individuals.cardQuantitySelector).toHaveAttribute('min', data.newStartValue);
            // Test stepping through values
            await individuals.cardQuantitySelector.locator('button').click();
            await individuals.cardQuantitySelector.locator('button').press('ArrowDown');
            await individuals.cardQuantitySelector.locator('button').press('Enter');
            await expect(await individuals.cardQuantitySelector.locator('.text-field-input')).toHaveValue(
                String(Number(data.newStartValue) + Number(data.newStepValue)),
            );
        });
    });
});
