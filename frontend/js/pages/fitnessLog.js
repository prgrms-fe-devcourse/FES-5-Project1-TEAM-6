import { insertFitnessLogTemplate } from '../dom/fitnessLogTemplate.js';
import { initFitness } from '../logList.js';
import { handlePopupEvents } from "../editor.js"
import { fetchDocuments } from '../api/fitnessApi.js';


export async function renderFitnessLog($container) {
  const documents = await fetchDocuments();

  const template = document.querySelector('#fitnessLogTemplate');
  if (!template) {
    insertFitnessLogTemplate();
  }

  const updatedTemplate = document.querySelector('#fitnessLogTemplate');
  const clone = updatedTemplate.content.cloneNode(true);
  $container.innerHTML = '';
  $container.appendChild(clone);

  initFitness();


  // 이벤트 등록
  const listContainer = document.querySelector('.log_list');
  listContainer.addEventListener('click', handlePopupEvents);

}