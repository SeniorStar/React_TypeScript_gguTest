import puppeteer from 'puppeteer';

export const scrapeShopifyPage = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    const fonts = await page.evaluate(() => {
      const fontLinks = Array.from(document.querySelectorAll('link[href*="fonts.googleapis.com"]'));
      return fontLinks.map((link) => {
        const url = link.getAttribute('href') || '';
        const familyMatch = /family=([^:&]+)/.exec(url);
        const family = familyMatch ? decodeURIComponent(familyMatch[1]).replace(/\+/g, ' ') : '';
        return {
          family,
          variants: '400', 
          letterSpacings: '0.01em', 
          fontWeight: '400',
          url,
        };
      });
    });

    const primaryButton = await page.evaluate(() => {
      const button = document.querySelector('form[action*="/cart/add"] button');
      if (!button) return null;

      const style = window.getComputedStyle(button);
      return {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        textTransform: style.textTransform,
        textDecoration: style.textDecoration,
        textAlign: style.textAlign,
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderColor: style.borderColor,
        borderWidth: style.borderWidth,
        borderRadius: style.borderRadius,
      };
    });

    await browser.close();

    return {
      fonts,
      primaryButton,
    };
  } catch (error: any) {
    await browser.close();
    throw new Error(`Scraping failed: ${error.message}`);
  }
};
