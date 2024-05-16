import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const secondSection = footer.querySelectorAll('.section')[1];

  const defaultContentWrapper = secondSection.querySelector('.default-content-wrapper');
  const newDiv = document.createElement('div');
  newDiv.classList.add('wrapper');
  const allParagraphs = defaultContentWrapper.querySelectorAll('p');
  
  // Append the last two <p> elements to the new div
  for (let i = allParagraphs.length - 2; i < allParagraphs.length; i++) {
    newDiv.appendChild(allParagraphs[i]);
  }
  
  // Append the new div inside the .default-content-wrapper
  defaultContentWrapper.appendChild(newDiv);

  block.append(footer);
}
