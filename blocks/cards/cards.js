import { createOptimizedPicture } from '../../scripts/aem.js';
import CardsPortfolio from './cards-portfolio.js';
import CardsCustomers from './cards-customers.js';

export default function decorate(block) {
  const isPortfolio = block.classList.contains('portfolio');
  const isCustomers = block.classList.contains('customers');

  if (isPortfolio) {
    CardsPortfolio(block);
  }

  if (isCustomers) {
    CardsCustomers(block);
  }

  if (!isPortfolio && !isCustomers) {
    block.classList.add('default');

    /* change to ul, li */
    const ul = document.createElement('ul');
    [...block.children].forEach((row) => {
        const li = document.createElement('li');
        while (row.firstElementChild) li.append(row.firstElementChild);
        [...li.children].forEach((div) => {
            if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
            else div.className = 'cards-card-body';
        });
        ul.append(li);
    });
    ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

    /* Modify a tags */
    ul.querySelectorAll('li').forEach((li) => {
        const a = li.querySelector('a');
        const href = a.href;

        a.parentElement.remove();

        const newA = document.createElement('a');
        newA.href = href;

        while (li.firstChild) {
            newA.appendChild(li.firstChild);
        }
        
        li.appendChild(newA);
    });

    block.textContent = '';
    block.append(ul);
  }
}