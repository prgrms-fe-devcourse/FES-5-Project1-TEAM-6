import { insertHomeTemplate } from '../dom/homeTemplate.js';
import { initSearch } from '../search.js';
import { initTabs } from '../tab.js';
import { initSlider } from '../hero.js';

export function renderHome($container) {
  const template = document.querySelector('#homeTemplate');
  if (!template) {
    insertHomeTemplate();
  }

  const updatedTemplate = document.querySelector('#homeTemplate');
  const clone = updatedTemplate.content.cloneNode(true);
  $container.innerHTML = '';
  $container.appendChild(clone);

  initTabs();
  initSearch();
  initSlider();
}