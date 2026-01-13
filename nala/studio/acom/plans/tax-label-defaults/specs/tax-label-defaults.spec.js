import taxLabelMapping from '../tax-label-mapping.js';

/**
 * Get tax labels for a specific locale
 * Converts locale format (e.g., 'en_CA', 'fr_CA') to mapping key format (e.g., 'CA_en', 'CA_fr')
 * Locale format: language_country (e.g., 'en_CA')
 * Mapping key format: country_language (e.g., 'CA_en')
 */
export function getLocaleTaxLabels(locale) {
    // Parse locale: 'en_CA' -> language='en', country='CA'
    const parts = locale.split('_');
    if (parts.length !== 2) {
        return null;
    }

    const [language, country] = parts;

    // Handle special language codes
    let langCode = language.toLowerCase();

    // Handle zh-hans and zh-hant - convert to zh for mapping
    // The mapping uses 'zh' for both simplified and traditional Chinese
    if (langCode === 'zh-hans' || langCode === 'zh-hant') {
        langCode = 'zh';
    }

    // Normal mapping: convert 'en_CA' to 'CA_en'
    const mappingKey = `${country}_${langCode}`;
    return taxLabelMapping[mappingKey] || null;
}

export default {
    FeatureName: 'M@S Studio ACOM Plans Tax Label Defaults',
    features: [
        {
            tcid: '0',
            name: '@studio-plans-tax-label-defaults',
            path: '/studio.html',
            browserParams: '#page=content&path=nala&query=',
            data: {
                cardid: '30c76591-5f3b-438e-8e06-7a01f882207c',
                locales: [
                    'en_AE',
                    'ar_AE',
                    'es_AR',
                    'de_AT',
                    'en_AU',
                    'en_BE',
                    'fr_BE',
                    'nl_BE',
                    'bg_BG',
                    'pt_BR',
                    'en_CA',
                    'fr_CA',
                    'de_CH',
                    'fr_CH',
                    'it_CH',
                    'es_CL',
                    'es_CO',
                    'es_CR',
                    'en_CY',
                    'cs_CZ',
                    'de_DE',
                    'da_DK',
                    'es_DO',
                    'en_DZ',
                    'ar_DZ',
                    'es_EC',
                    'et_EE',
                    'en_EG',
                    'ar_EG',
                    'es_ES',
                    'fi_FI',
                    'fr_FR',
                    'en_GB',
                    'el_GR',
                    'en_GR',
                    'es_GT',
                    'en_HK',
                    'zh-hant_HK',
                    'hu_HU',
                    'en_ID',
                    'id_ID',
                    'en_IE',
                    'iw_IL',
                    'en_IL',
                    'en_IN',
                    'hi_IN',
                    'it_IT',
                    'ja_JP',
                    'ko_KR',
                    'en_KW',
                    'ar_KW',
                    'lt_LT',
                    'en_LU',
                    'fr_LU',
                    'de_LU',
                    'lv_LV',
                    'en_MT',
                    'en_MU',
                    'es_MX',
                    'en_MY',
                    'ms_MY',
                    'en_NG',
                    'nl_NL',
                    'nb_NO',
                    'en_NZ',
                    'es_PE',
                    'en_PH',
                    'fil_PH',
                    'pl_PL',
                    'pt_PT',
                    'en_QA',
                    'ar_QA',
                    'ro_RO',
                    'ru_RU',
                    'en_SA',
                    'ar_SA',
                    'sv_SE',
                    'en_SG',
                    'sl_SI',
                    'sk_SK',
                    'en_TH',
                    'th_TH',
                    'en_TM',
                    'ru_TM',
                    'tr_TR',
                    'zh-hant_TW',
                    'uk_UA',
                    'en_US',
                    'en_VN',
                    'vi_VN',
                    'en_ZA',
                ],
            },
            getLocaleTaxLabels,
            tags: '@mas-studio @acom @acom-plans @acom-plans-tax-label-defaults @commerce @smoke @regression',
        },
    ],
};
