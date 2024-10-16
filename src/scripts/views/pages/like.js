import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Liked Restaurant</h2>
        <div></div><div></div>
        <div id="restaurant" class="restaurants">
        </div>
      </div>
    `;
  },

  async afterRender() {
    // Panggil fungsi untuk menyembunyikan hero dan explore restaurant
    this.hideHeroAndExplore();

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurant');

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML
        += createRestaurantItemTemplate(restaurant);
    });
  },

  hideHeroAndExplore() {
    const heroSection = document.querySelector('.hero');
    const exploreSection = document.querySelector('.explore-restaurants');

    // Sembunyikan hero section jika ada
    if (heroSection) {
      heroSection.style.display = 'none';
    }

    // Sembunyikan explore restaurant section jika ada
    if (exploreSection) {
      exploreSection.style.display = 'none';
    }
  },
};

export default Like;
