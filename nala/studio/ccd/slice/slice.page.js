export default class CCDSlicePage {
    constructor(page) {
        this.page = page;

        this.cardIcon = page.locator('merch-icon');
        this.cardBadge = page.locator('.ccd-slice-badge');
        this.cardImage = page.locator('div[slot="image"] img');
        this.cardDescription = page.locator('div[slot="body-s"]');
        this.cardLegalLink = page.locator('div[slot="body-s"] p > a');
        this.cardCTA = page.locator('div[slot="footer"] > button');
        this.cardPriceSlot = page.locator('span[data-template="price"]');
        this.cardPrice = page.locator('span[data-template="price"] > .price-alternative');
        this.cardPriceStrikethrough = page.locator('span[data-template="strikethrough"]');
        this.cardPromoPriceStrikethrough = page.locator('span[data-template="price"] > .price-strikethrough');

        // Slice card properties:
        this.cssProp = {
            singleSize: {
                'min-width': '290px',
                'max-width': '322px',
                'max-height': '154px',
            },
            doubleSize: {
                'min-width': '290px',
                'max-width': '600px',
                'max-height': '154px',
            },
            card: {
                'background-color': 'rgb(248, 248, 248)',
                'border-bottom-color': 'rgb(230, 230, 230)',
                'border-left-color': 'rgb(230, 230, 230)',
                'border-right-color': 'rgb(230, 230, 230)',
                'border-top-color': 'rgb(230, 230, 230)',
            },
            icon: {
                width: '30px',
                height: '29px',
            },
            badge: {
                'background-color': 'rgb(248, 217, 4)',
                'font-size': '12px',
                'font-weight': '400',
            },
            description: {
                color: 'rgb(34, 34, 34)',
                'font-size': '14px',
                'font-weight': '700',
                'line-height': '18px',
            },
            legalLink: {
                color: 'rgb(34, 34, 34)',
                'font-size': '12px',
                'font-weight': '400',
                'line-height': '18px',
            },
            price: {
                color: 'rgb(34, 34, 34)',
                'font-size': '14px',
                'font-weight': '700',
                'line-height': '18px',
            },
            strikethroughPrice: {
                color: 'rgb(109, 109, 109)',
                'font-size': '14px',
                'font-weight': '400',
                'line-height': '18px',
                'text-decoration-color': 'rgb(109, 109, 109)',
                'text-decoration-line': 'line-through',
            },
            cta: {
                'background-color': 'rgb(2, 101, 220)',
                color: 'rgb(255, 255, 255)',
                'font-size': '12px',
                'font-weight': '700',
            },
        };
    }
}
