import { scrapeShopifyPage } from '../src/services/scraperService';

describe('Scrape Shopify Page', () => {
  it('should scrape fonts and button styles from a Shopify product page', async () => {
    const url = 'https://growgrows.com/en-us/products/plentiful-planets-sleepsuit';
    const result = await scrapeShopifyPage(url);
    expect(result).toHaveProperty('fonts');
    expect(result).toHaveProperty('primaryButton');
  });
});
