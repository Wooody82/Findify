module.exports = [
    {
        store: 'Jula',
        method: 'GET',
        url: (query) => `https://www.jula.se/_next/data/_kPbOKEqnrGpXnkuSx1I0/sv-SE/search.json?query=${query}&path=search`,
        extractFn: require('./extractors').extractProductInfoFromJula
    },
    {
        store: 'Lindex',
        method: 'GET',
        url: (query) => `https://www.lindex.com/se/api/products/search?query=${query}&country=SE&pageSize=24&startIndex=0&facets%5B0%5D.name=status&facets%5B0%5D.value=comingsoon_%7Bcountrycode%7D%3Bpublished_%7Bcountrycode%7D&facets%5B0%5D.mode=&sort=Relevancy`,
        extractFn: require('./extractors').extractProductInfoFromLindex
    },
    {
        store: 'XXL',
        method: 'POST',
        headers: { 'Api-Version': 'V3' },
        url: (query) => 'https://api.xxlsports.com/search-api-v3/sites/xxl-se/search',
        extractFn: require('./extractors').extractProductInfoFromXXL,
        payload: (query) => ({ query: query, take: 500, skip: 0, sortBy: [{ type: 'custom', customName: 'relevance' }], facets: [], provider: 'loop' })
    },
    {
        store: "Class Ohlson",
        method: 'GET',
        url: (query) => `https://www.clasohlson.com/se/search/getSearchResults?text=${query}`,
        extractFn: require('./extractors').extractProductInfoFromClassOhlson
    },
    {
        store: "Biltema",
        method: 'GET',
        url: (query) => `https://find.biltema.com/v4/web/typeahead/100/sv/?query=${query}&from=0&take=500&IsPreferInStockAndNotPhasedOut=True&sortBy=recommended&sortDir=asc`,
        extractFn: require('./extractors').extractProductInfoFromBiltema
    },
    {
        store: "HM",
        method: 'GET',
        url: (query) => `https://www2.hm.com/sv_se/search-results/_jcr_content/search.display.json?q=${query}&sort=stock&image-size=small&image=stillLife&offset=0&page-size=500`,
        extractFn: require('./extractors').extractProductInfoFromHM
    },
    {
        store: "Willys",
        method: 'GET',
        url: (query) => `https://www.willys.se/search?size=500&page=0&q=${query}&avoidCache=1692729021245`,
        extractFn: require('./extractors').extractProductInfoFromWillys
    }    
];
