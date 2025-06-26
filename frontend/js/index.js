import { route } from './router/router.js';

export * from '../js/header.js'


route();

window.addEventListener('click', e => {
  if (e.target.classList.contains('menu_item')) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    history.pushState(null, null, href);
    route();
  }
});

window.addEventListener('popstate', route);