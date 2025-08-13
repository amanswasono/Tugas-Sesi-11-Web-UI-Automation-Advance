import { By, until } from 'selenium-webdriver';

export default class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.className('title');
        this.sortDropdown = By.css('select.product_sort_container');
        this.productNames = By.css('.inventory_item_name');
    }

    async getTitle() {
        const titleEl = await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
        return titleEl.getText();
    }

    async sortByNameAsc() {
        const dropdown = await this.driver.wait(until.elementLocated(this.sortDropdown), 5000);
        await dropdown.click();
        await this.driver.findElement(By.css('option[value="az"]')).click();
    }

    async getAllProductNames() {
        const nameEls = await this.driver.findElements(this.productNames);
        return Promise.all(nameEls.map(el => el.getText()));
    }
}
