export default {
    FeatureName: 'M@S Studio',
    features: [
        {
            tcid: '0',
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
            browserParams: {
                token: '?token=',
                query: '#query=',
            },
            tags: '@mas-studio',
        },
        {
            tcid: '1',
            name: '@studio-search-field',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
            },
            browserParams: {
                token: '?token=',
                path: '#path=nala',
            },
            tags: '@mas-studio',
        },
        {
            tcid: '2',
            name: '@studio-edit-title',
            path: '/studio.html',
            data: {
                cardid: '206a8742-0289-4196-92d4-ced99ec4191e',
                title: 'Automation Test Card',
                newTitle: 'Change title',
            },
            browserParams: {
                token: '?token=',
                query: '#query=',
            },
            tags: '@mas-studio',
        },
    ],
};
