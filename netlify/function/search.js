const axios = require('axios');
const websiteMapping = require('./websiteConfig');

exports.handler = async function(event, context) {
  try {
    const query = event.queryStringParameters.query;

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Please provide a search query.' }),
      };
    }

    const fetchPromises = websiteMapping.map(website =>
      fetchProductInfoFromWebsite(website, query)
    );

    const results = await Promise.all(fetchPromises);
    const allProductInfos = results.flatMap(result => result.productInfos);

    return {
      statusCode: 200,
      body: JSON.stringify({ products: allProductInfos }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while fetching product information.' }),
    };
  }
};

function fetchProductInfoFromWebsite(website, query) {
  const url = website.url(query);
  const headers = website.headers || {};
  const method = website.method || 'GET';
  const payload = website.payload ? website.payload(query) : null;
  const config = { method, url: url, headers, data: payload };

  return axios(config)
    .then(response => {
      const productInfos = website.extractFn(response.data, website.store);
      return { productInfos };
    })
    .catch(error => {
      console.log(error);
      return { productInfos: [] };
    });
};
