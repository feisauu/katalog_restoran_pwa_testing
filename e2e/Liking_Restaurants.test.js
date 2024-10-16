/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
const assert = require('assert');

Feature('Liking & Unliking Restaurants');

const baseUrl = 'http://localhost:9090';

Before(({ I }) => {
  I.amOnPage(`${baseUrl}/#/like`);
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.content__heading');
  I.see('Your Liked Restaurant');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Your Liked Restaurant', '.content__heading');

  I.amOnPage(baseUrl);

  I.seeElement('.restaurant-item__content h2 a');

  I.waitForElement('.restaurant-item__content h2', 5);
  const firstRestaurant = locate('.restaurant-item__content h2 a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage(`${baseUrl}/#/like`);
  I.waitForElement('.restaurant-item__content h2', 5);
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__content h2');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('Unliking one restaurant', async ({ I }) => {
  I.amOnPage(`${baseUrl}/#/like`);

  I.see('Your Liked Restaurant', '.content__heading');

  I.amOnPage(baseUrl);

  I.waitForElement('.restaurant-item__content h2', 10);
  I.click(locate('.restaurant-item__content h2').first());

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage(`${baseUrl}/#/like`);

  I.dontSeeElement('Your Liked Restaurant', '.content__heading');

  I.waitForElement('.restaurant-item__content h2', 10);
  I.click(locate('.restaurant-item__content h2').first());

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage(`${baseUrl}/#/like`);

  I.dontSeeElement('.restaurant-item__content h2');
});

Scenario('should display restaurant item correctly', async ({ I }) => {
  I.amOnPage(baseUrl);
  I.waitForVisible('.restaurant-item__header__poster', 10);
  I.seeElement('.restaurant-item__header__poster');

  const restaurantName = await I.grabTextFrom('.restaurant-item__content h2 a');
  assert.strictEqual(restaurantName, 'Melting Pot');

  I.saveScreenshot('restaurant_item_visible.png');
});

Scenario('should display restaurant rating correctly', async ({ I }) => {
  I.amOnPage(baseUrl); // Access the main page

  I.waitForVisible('.restaurant-item__header__rating__score', 10); // Wait for rating to be visible

  const rating = await I.grabTextFrom('.restaurant-item__header__rating__score'); // Get the rating value

  assert.strictEqual(rating, '4.2'); // Ensure rating matches displayed value

  I.saveScreenshot('restaurant_rating.png');
});