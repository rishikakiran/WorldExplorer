import { AppPage } from './app.po';
import { browser, by ,element } from 'protractor';
import {protractor } from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('WorldExplorer');
  });

  it('should be redirected to /login route on opening the application', () => {
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should be redirected to /register route', () => {
    browser.element(by.css('.registerMe')).click();
    expect(browser.getCurrentUrl()).toContain('/register');
  });

  it('should be able to register user', () => {

    browser.element(by.id('userId')).sendKeys('Super User12');
    browser.element(by.id('firstName')).sendKeys('Super User');
    browser.element(by.id('lastName')).sendKeys('Super lastUser');
    browser.element(by.id('password')).sendKeys('Super Userpass');
    browser.element(by.css('.registerMe')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });
  

  it('should be able to login user and navigate to SEARCH', () => {
    browser.element(by.id('userId')).sendKeys('Super User12');
    browser.element(by.id('password')).sendKeys('Super Userpass');
    browser.element(by.css('.loginMe')).click();
    browser.driver.sleep(5000);
    expect(browser.getCurrentUrl()).toContain('/countries');
  });

  it('should be able to search countries', () => {
    browser.element(by.css('.search-button')).click();
    expect(browser.getCurrentUrl()).toContain('/countries/search');
    browser.element(by.id('search-button-input')).sendKeys('india');
    browser.element(by.id('search-button-input')).sendKeys(protractor.Key.ENTER);

    const searchItems = element.all(by.css('.country-card'));
    expect(searchItems.count()).toBe(2);
    browser.element(by.id('addToFav')).click();
    
    
  });
  it('should be able to add country to favourites', async() => {
      browser.driver.manage().window().maximize();
    browser.driver.sleep(1000);
    const searchItems = element.all(by.css('.country-card'));
    expect(searchItems.count()).toBe(2);
    for(let i = 0; i < 1; i += 1) {
      expect(searchItems.get(i).getText()).toContain('British Indian Ocean Territory');
    }
    
  });
  

});
