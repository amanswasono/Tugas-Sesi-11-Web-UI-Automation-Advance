import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';
import path from 'path';
import { fileURLToPath } from 'url';

import LoginPage from '../pages/loginPage.js';
import ProductsPage from '../pages/productsPage.js';
import { compareScreenshot } from '../utils/visualHelper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Sauce Demo - POM + Visual Testing', function () {
    this.timeout(60000);
    let driver;
    let loginPage;
    let productsPage;

    before(async () => {
        const options = new chrome.Options();
        options.addArguments('--headless', '--window-size=1920,1080');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

        // // Set ukuran viewport agar visual testing konsisten
        await driver.manage().window().setRect({ width: 1366, height: 768 });

        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
    });

    after(async () => {
        await driver.quit();
    });

    it('Visual Testing - Halaman Login', async () => {
        await loginPage.open();
        const logoElement = await loginPage.getLoginLogo();

        const baselinePath = path.join(__dirname, '../baselines/login_logo.png');
        const currentPath = path.join(__dirname, '../output/login_logo_current.png');
        const diffPath = path.join(__dirname, '../output/login_logo_diff.png');

        const result = await compareScreenshot(driver, logoElement, baselinePath, currentPath, diffPath);

        if (!result.baselineCreated) {
            assert.strictEqual(result.mismatch, 0, `Visual mismatch: ${result.mismatch} pixel berbeda`);
        }
    });

    it('User berhasil login', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        const title = await productsPage.getTitle();
        assert.strictEqual(title, 'Products');
    });

    it('User berhasil sort produk A-Z', async () => {
        await productsPage.sortByNameAsc();
        const productNames = await productsPage.getAllProductNames();
        const sortedNames = [...productNames].sort();
        assert.deepStrictEqual(productNames, sortedNames);
    });
});
