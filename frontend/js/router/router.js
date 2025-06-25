import { renderHome } from '../pages/home.js';
import { renderFitnessLog } from '../pages/fitnessLog.js';

export function route() {
  const { pathname } = location;
  const $container = document.querySelector('#container');

  if (pathname === '/' || pathname === '/home') {
    renderHome($container);
  } else if (pathname === '/exercise') {
    $container.innerHTML = '<h2 class="notice_txt">⚠️현재 리뉴얼 중입니다.</h2>';
  } else if (pathname === '/fitness-log') {
    renderFitnessLog($container);
  } else {
    $container.innerHTML = '<h1>404</h1>';
  }
}