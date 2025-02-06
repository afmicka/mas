export default {
    FeatureName: 'M@S Studio',
    features: [
        {
            tcid: '0',
            name: '@studio-load',
            path: '/studio.html',
            tags: '@mas-studio',
        },
        {
            tcid: '1',
            name: '@studio-direct-search',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
                title: 'Automation Test Card',
                eyebrow: 'DO NOT EDIT',
                description: 'MAS repo validation card for Nala tests.',
                price: 'US$22.99/mo',
                strikethroughPrice: 'US$37.99/mo',
                cta: 'Buy now',
                offerid: '30404A88D89A328584307175B8B27616',
                linkText: 'See terms',
                linkUrl: '',
            },
            browserParams: '#query=',
            tags: '@mas-studio @nopr', // remove @nopr tag once MWPW-165152 is fixed
        },
        {
            tcid: '2',
            name: '@studio-search-field',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
            },
            browserParams: '#path=nala',
            tags: '@mas-studio',
        },
        {
            tcid: '3',
            name: '@studio-suggested-editor',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
            },
            browserParams: '#query=',
            tags: '@mas-studio',
        },
        {
            tcid: '4',
            name: '@studio-suggested-edit-title',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
                title: 'Automation Test Card',
                newTitle: 'Change title',
            },
            browserParams: '#query=',
            tags: '@mas-studio',
        },
        {
            tcid: '5',
            name: '@studio-suggested-edit-eyebrow',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
                subtitle: 'do not edit',
                newSubtitle: 'Change subtitle',
            },
            browserParams: '#query=',
            tags: '@mas-studio',
        },
        {
            tcid: '6',
            name: '@studio-suggested-edit-description',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
                description: 'MAS repo validation card for Nala tests',
                newDescription: 'New Test Description',
            },
            browserParams: '#query=',
            tags: '@mas-studio',
        },
        {
            tcid: '7',
            name: '@studio-suggested-edit-mnemonic',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
                iconURL:
                    'https://www.adobe.com/content/dam/shared/images/product-icons/svg/photoshop.svg',
                newIconURL:
                    'https://www.adobe.com/content/dam/shared/images/product-icons/svg/illustrator.svg',
            },
            browserParams: '#query=',
            tags: '@mas-studio',
        },
        {
            tcid: '8',
            name: '@studio-suggested-edit-background',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
                newBackgroundURL:
                    'https://main--milo--adobecom.hlx.page/assets/img/commerce/media_1d63dab9ee1edbf371d6f0548516c9e12b3ea3ff4.png',
            },
            browserParams: '#query=',
            tags: '@mas-studio',
        },
        {
            tcid: '9',
            name: '@studio-suggested-clone-edit-save-delete',
            path: '/studio.html',
            data: {
                cardid: 'cc85b026-240a-4280-ab41-7618e65daac4',
                title: 'Field Edit & Save',
                newTitle: 'Cloned Field Edit',
                newSubtitle: 'New Subtitle',
                newIconURL:
                    'https://www.adobe.com/content/dam/shared/images/product-icons/svg/illustrator.svg',
                newDescription: 'New Test Description',
            },
            browserParams: '#query=',
            tags: '@mas-studio',
        },
    ],
};
