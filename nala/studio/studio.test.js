import { expect, test } from '@playwright/test';
import StudioSpec from './studio.spec.js';
import StudioPage from './studio.page.js';
import ims from '../libs/imslogin.js';

const { features } = StudioSpec;
const miloLibs = process.env.MILO_LIBS || '';
let authToken;
let adobeIMS;
let studio;

test.beforeAll(async ({ browser }) => {
    test.slow();
    const page = await browser.newPage();
    await page.goto(
        'https://www.adobe.com/creativecloud/plans.html?mboxDisable=1&adobe_authoring_enabled=true',
    );
    const signinBtn = page
        .locator('#universal-nav button.profile-comp')
        .first();
    await expect(signinBtn).toBeVisible();
    await signinBtn.click();
    await page.waitForURL('**/auth.services.adobe.com/en_US/index.html**/');
    features[0].url = `https://www.adobe.com/creativecloud/plans.html?mboxDisable=1&adobe_authoring_enabled=true`;
    await ims.fillOutSignInForm(features[0], page);
    await expect(async () => {
        const response = await page.request.get(features[0].url);
        expect(response.status()).toBe(200);
    }).toPass();
    authToken = await page.evaluate(() => adobeIMS.getAccessToken().token);
});

test.beforeEach(async ({ page, browserName, baseURL }) => {
    test.skip(
        browserName !== 'chromium',
        'Not supported to run on multiple browsers.',
    );
    studio = new StudioPage(page);
});

test.describe('M@S Studio feature test suite', () => {
    // @studio-direct-search - Validate direct search feature in mas studio
    test(`${features[0].name},${features[0].tags}`, async ({
        page,
        baseURL,
    }) => {
        const { data } = features[0];
        const testPage = `${baseURL}${features[0].path}${miloLibs}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to the studio with authorization token', async () => {
            const authPage = `${testPage}${features[0].browserParams.token}${authToken}`;
            await page.goto(authPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Go to MAS Studio test page', async () => {
            await page.goto(
                `${testPage}${features[0].browserParams.query}${data.cardid}`,
            );
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-3: Validate search results', async () => {
            await expect(await studio.renderView).toBeVisible();
            const cards = await studio.renderView.locator('merch-card');
            expect(await cards.count()).toBe(1);
        });
    });

    // @studio-search-field - Validate search field in mas studio
    test(`${features[1].name},${features[1].tags}`, async ({
        page,
        baseURL,
    }) => {
        const { data } = features[1];
        const testPage = `${baseURL}${features[1].path}${miloLibs}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to the studio with authorization token', async () => {
            const authPage = `${testPage}${features[1].browserParams.token}${authToken}`;
            await page.goto(authPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Go to MAS Studio test page', async () => {
            await page.goto(`${testPage}${features[1].browserParams.path}`);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-3: Validate search field rendered', async () => {
            await expect(await studio.searchInput).toBeVisible();
            await expect(await studio.searchIcon).toBeVisible();
            await expect(await studio.renderView).toBeVisible();
            const cards = await studio.renderView.locator('merch-card');
            expect(await cards.count()).toBeGreaterThan(1);
        });

        await test.step('step-4: Validate search feature', async () => {
            await studio.searchInput.fill(data.cardid);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(2000);
            expect(await studio.getCard(data.cardid, 'suggested')).toBeVisible;
            const searchResult = await studio.renderView.locator('merch-card');
            expect(await searchResult.count()).toBe(1);
        });
    });

    // @studio-edit-title - Validate edit title feature in mas studio
    test(`${features[2].name},${features[2].tags}`, async ({
        page,
        baseURL,
    }) => {
        const { data } = features[2];
        const testPage = `${baseURL}${features[2].path}${miloLibs}`;
        console.info('[Test Page]: ', testPage);

        await test.step('step-1: Go to the studio with authorization token', async () => {
            const authPage = `${testPage}${features[2].browserParams.token}${authToken}`;
            await page.goto(authPage);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-2: Go to MAS Studio test page', async () => {
            await page.goto(
                `${testPage}${features[2].browserParams.query}${data.cardid}`,
            );
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('step-3: Open card editor', async () => {
            expect(await studio.getCard(data.cardid, 'suggested')).toBeVisible;
            await (await studio.getCard(data.cardid, 'suggested')).dblclick();
            expect(await studio.editorPanel).toBeVisible;
        });
        await test.step('step-4: Edit title field', async () => {
            expect(await studio.editorPanel.title).toBeVisible;
            await expect(
                await studio.editorPanel.locator(studio.editorTitle),
            ).toHaveAttribute('value', `${data.title}`);
            await studio.editorPanel
                .locator(studio.editorTitle)
                .locator('input')
                .fill(data.newTitle);
        });
    });
});
