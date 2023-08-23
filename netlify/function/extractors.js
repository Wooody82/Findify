// extractors.js
function extractProductInfoFromJula(responseData, store) {
    const items = getValueByPath(responseData.pageProps.layoutData.sitecore.route.placeholders["jula-main"][0], 'fields.products');

    if (items && Array.isArray(items)) {
        const productInfos = [];
        for (const item of items) {
            const title = item.title;
            const price = Number(item.listPrice.price.replace(',', '.'));
            const outOfStock = !item.productInWebStock
            const link = 'https://www.jula.se' + item.url;
            const image = item.assets[0] ? item.assets[0].location : ''

            if (title && price) {
                productInfos.push({ store, title, price, outOfStock: outOfStock, link, image });
            }
        }
        return productInfos;
    }
    return [];
}

function extractProductInfoFromLindex(responseData, store) {
    const items = getValueByPath(responseData, 'payload.variants');

    if (Array.isArray(items)) {
        const productInfos = [];
        for (const item of items) {
            const title = item.name;
            const price = Number(item.regularPrice.formattedValue.replace(/\s+/g, ''));
            const outOfStock = item.variantStatus !== 'Available' ? true : false;
            const link = 'https://www.lindex.com' + item.url;
            const image = `https://i8.amplience.net//s/Lindex/${item.styleId}_${item.variantColorId}` + '_ModelVariant?fmt=auto&$qltDefault$&$cache$&$productGridNoMenuBig$&$crop$&vw=1650'

            productInfos.push({ store, title, price, outOfStock: outOfStock, link, image });
        }
        return productInfos;
    }
    return [];
}

function extractProductInfoFromXXL(responseData, store) {
    const items = getValueByPath(responseData, 'results.items');

    if (Array.isArray(items)) {
        const productInfos = [];

        for (const item of items) {
            const name = item.name;
            const price = Number(item.priceDisplay.salesPrice);
            const outOfStock = item.stockStatus === 'OUTOFSTOCK' ? true : false;
            const link = 'https://www.xxl.se' + item.url;
            const image = `https://www.xxl.se${item.primaryImage}`

            if (name && price) {
                productInfos.push({ store, title: name, price, outOfStock: outOfStock, link, image });
            }
        }
        return productInfos;
    }
    return [];
}


function extractProductInfoFromClassOhlson(responseData, store) {
    const items = getValueByPath(responseData, 'categoryResponseDTOs.products');

    if (Array.isArray(items)) {
        const productInfos = [];

        for (const item of items) {
            const name = item.name;
            const price = Number(item.formattedCurrentPrice.replace(',', '.'));
            const outOfStock = !item.inStock;
            const link = 'https://www.clasohlson.com/se' + item.url;
            const image = `https://www.clasohlson.com${item.thumbnailImage}`

            if (name && price) {
                productInfos.push({ store, title: name, price, outOfStock: outOfStock, link, image });
            }
        }
        return productInfos;
    }
    return [];
}


function extractProductInfoFromBiltema(responseData, store) {
    const items = getValueByPath(responseData, 'documents');

    if (Array.isArray(items)) {
        const productInfos = [];

        for (const item of items) {
            const name = item.name;
            const price = Number(item.priceRaw);
            // const outOfStock = item.stockIndicator === 0 ? true : false;
            const link = item.parentUrl + item.name.replace(/\s+/g, '-').replace(',', '') + '-' + item.id;
            const image = `https://productimages.biltema.com/v1/image/product/small/${item.id}/1`

            if (name && price) {
                productInfos.push({ store, title: name, price, link, image });
            }
        }
        return productInfos;
    }
    return [];
}

function extractProductInfoFromHM(responseData, store) {
    const items = getValueByPath(responseData, 'products');

    if (Array.isArray(items)) {
        const productInfos = [];

        for (const item of items) {
            const name = item.title;
            const price = Number(item.price.split('kr.')[0].replace(/\s+/g, '').replace(',', '.'));
            const outOfStock = item.outOfStockText
            const link = 'https://www2.hm.com/' + item.link;
            const image = "https:" + item.image[0].src

            if (name && price) {
                productInfos.push({ store, title: name, price, image, link, outOfStock: outOfStock });
            }
        }
        return productInfos;
    }
    return [];
}

function extractProductInfoFromWillys(responseData, store) {
    const items = getValueByPath(responseData, 'results');

    if (Array.isArray(items)) {
        const productInfos = [];

        for (const item of items) {
            const name = item.name;
            const price = Number(item.priceValue);
            const outOfStock = item.outOfStock
            const link = 'https://www.willys.se/erbjudanden/online-' + item.name.replace(/\s+/g, '-') + '-' + item.code;
            const image = item.image.url.replace("t_200", "t_500");

            if (name && price) {
                productInfos.push({ store, title: name, price, image, outOfStock: outOfStock, link });
            }
        }
        return productInfos;
    }
    return [];
}






function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, curr) => acc && acc[curr], obj);
}

module.exports = {
    extractProductInfoFromJula,
    extractProductInfoFromLindex,
    extractProductInfoFromXXL,
    extractProductInfoFromClassOhlson,
    extractProductInfoFromBiltema,
    extractProductInfoFromHM,
    extractProductInfoFromWillys
};