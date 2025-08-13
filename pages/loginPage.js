import { By, until } from 'selenium-webdriver';

export default class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://www.saucedemo.com/';
        this.usernameInput = By.css('[data-test="username"]');
        this.passwordInput = By.css('[data-test="password"]');
        this.loginButton = By.css('[data-test="login-button"]');
        this.logo = By.className('login_logo');
    }

    async open() {
        await this.driver.get(this.url);
    }

    async login(username, password) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async getLoginLogo() {
        const logoEl = await this.driver.wait(until.elementLocated(this.logo), 5000);
        return logoEl;
    }
}
