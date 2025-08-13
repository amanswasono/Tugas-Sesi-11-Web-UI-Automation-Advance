// pages/BasePage.js
export default class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async open(url) {
        await this.driver.get(url);
    }

    async click(locator) {
        const el = await this.driver.findElement(locator);
        await el.click();
    }

    async type(locator, text) {
        const el = await this.driver.findElement(locator);
        await el.sendKeys(text);
    }

    async getText(locator) {
        const el = await this.driver.findElement(locator);
        return await el.getText();
    }

    async isDisplayed(locator) {
        const el = await this.driver.findElement(locator);
        return await el.isDisplayed();
    }
}
