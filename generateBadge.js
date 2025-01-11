const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add these flags
        });
        const page = await browser.newPage();

        // Set a high-resolution viewport
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 2,
        });

        // Navigate to the TryHackMe dynamic badge page
        const url = 'https://tryhackme.com/api/v2/badges/public-profile?userPublicId=3153096';
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for the badge element
        const badgeSelector = '#thm-badge';
        await page.waitForSelector(badgeSelector);

        // Optionally scale the badge up for better visibility
        await page.addStyleTag({
            content: '#thm-badge { transform: scale(1.5); transform-origin: top left; }',
        });

        // Take a screenshot of the badge element
        const badgeElement = await page.$(badgeSelector);
        if (badgeElement) {
            await badgeElement.screenshot({ path: 'tryhackme-badge-high-quality.png' });
            console.log('High-quality screenshot saved as tryhackme-badge-high-quality.png');
        } else {
            console.log('Badge element not found!');
        }

        await browser.close();
    } catch (error) {
        console.error('Error generating screenshot:', error);
    }
})();
