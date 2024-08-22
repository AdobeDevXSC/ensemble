import { createOptimizedPicture } from '../../scripts/aem.js';

export default function CardsTeams (block) {
  const link = block.querySelector('a');
  let data = [];

  block.textContent = '';

  function createCards(data) { 
    const cards = [];
  
    data.forEach((item) => {
      const card = [];
      const optimizedImage = createOptimizedPicture(item.image, `Role: ${item.title}`, true, [{ width: '750' }]);

      card.push(`
        <a href=${item.url}>
          <div class="cards-card-image">${optimizedImage.outerHTML}</div>
          <div class="cards-card-body"><p>${item.title}</p></div>
        </a>
      `);

      cards.push(`<li>${card.join('')}</li>`);
    });
  
    block.innerHTML = `<ul>${cards.join('')}</ul>`;
  }

  async function initialize() {
    const response = await fetch(link?.href);

    if (response.ok) {
      const jsonData = await response.json();
      data = jsonData?.data;
      
      createCards(data);
    } else {
      console.log("Unable to get json data for cards teams");
    }
  }

  initialize();
}
