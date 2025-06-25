import { insertFitnessLogTemplate } from '../dom/fitnessLogTemplate.js';
import { initFitness } from '../logList.js';

export function renderFitnessLog($container) {
  const template = document.querySelector('#fitnessLogTemplate');
  if (!template) {
    insertFitnessLogTemplate();
  }

  const updatedTemplate = document.querySelector('#fitnessLogTemplate');
  const clone = updatedTemplate.content.cloneNode(true);
  $container.innerHTML = '';
  $container.appendChild(clone);

  initFitness();

}