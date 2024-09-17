import { createOptimizedPicture } from '../../scripts/aem.js';

export default function CardsPortfolio (block) {
  const link = block.querySelector('a');
  let data = [];

  block.textContent = '';

  function createCards(groups) {  
    const initialCards = [];
    const remainingCards = [];
    let hasCaseStudy = false;
    let caseStudyCount = 0;
  
    groups.forEach((group, groupIdx) => {
      let smallCards = [];

      group.forEach((item, i) => {
        if (caseStudyCount < 2 && item.caseStudy === 'true') {
          caseStudyCount++;
          hasCaseStudy = true;
          const optimizedBgImage = createOptimizedPicture(item.backgroundImage, item.name, true, [{ width: '600' }]);
          const optimizedLogoImage = createOptimizedPicture(item.logoImage, item.name, true, [{ width: '600' }]);

          initialCards.push(`
            <div class="case-study-card">
              <div class="wrapper">
                <a href="${item.url}">
                  <div class="pill">Case Study</div>
                  <div class="card-images">
                    ${optimizedBgImage.outerHTML}
                    ${optimizedLogoImage.outerHTML}
                  </div>
                </a>
              </div>
            </div>
          `);
        } else {  
          const optimizedBgImage = createOptimizedPicture(item.backgroundImage, item.name, true, [{ width: '350' }]);
          const optimizedLogoImage = createOptimizedPicture(item.logoImage, item.name, true, [{ width: '350' }]);

          const cardHTML = `
            <div class="small-card">
              <div class="card-flip wrapper">
                <div class="card card-images">
                  ${optimizedBgImage.outerHTML}
                  ${optimizedLogoImage.outerHTML}
                </div>
                <div class="card card-info">
                  <p class="desktop">${item.description}</p>
                  <p class="mobile"><a href="${item.contactUsLink}">Contact Us</a> to learn more about this project</p>
                  <a class="desktop-contact-us" href="${item.contactUsLink}">Contact Us</a>
                </div>
              </div>
            </div>
          `;
        
          smallCards.push(cardHTML);
        }
      });

      if (groupIdx === 0 && caseStudyCount < 2) {
        initialCards.push(`
          <div class="small-card-container ">
            ${smallCards.join('')}
          </div>
        `);
      } else {
        remainingCards.push(`${smallCards.join('')}`);
      }
    });
  
    block.innerHTML = `
      <div class="portfolio-card-container ${hasCaseStudy ? '' : 'no-case-study'}">
        ${initialCards.join('')}
      </div>
      ${remainingCards.length > 0 ? `<div class="remaining-cards"><div class="small-card-container">${remainingCards.join('')}</div></div><button type="button" class="view-more-btn">View More</button>` : ''}
    `;

    addEventListeners();
  }

  function groupAndSortData(data) {
    let groupedData = [];  // Array to hold the final grouped result
    let currentGroup = []; // Array to collect items for the current group
    let itemCount = 0; // Counter to track the number of items in the current group

    // Sort the entire data array by caseStudy property in descending order
    data.sort((a, b) => b.caseStudy.localeCompare(a.caseStudy));

    for (let i = 0; i < data.length; i++) {
        currentGroup.push(data[i]);
        itemCount++;

        // If the group has reached 8 items, or if we have 5 items and one of them has a caseStudy, push the group to result
        if (itemCount === 8 || (currentGroup.some(item => item.caseStudy === "true") && itemCount === 5)) {
            groupedData.push(currentGroup); // Add the current group to the final result
            currentGroup = []; // Reset the current group for the next set of items
            itemCount = 0; // Reset the item counter for the next group
        }
    }

    // If there are any remaining items in currentGroup, add them to the result
    if (currentGroup.length > 0) {
        groupedData.push(currentGroup);
    }

    return groupedData;
  }

  function addEventListeners() {
    //Add card-flip animation
    const cards = document.querySelectorAll('.card-flip');
    [...cards].forEach((card)=>{
      card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
      });
    });

    //View more button
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const remainingCardsWrapper = document.querySelector('.remaining-cards');

    if (viewMoreBtn) {
      viewMoreBtn.addEventListener('click', () => {
        viewMoreBtn.classList.toggle('active');
  
        if (viewMoreBtn.classList.contains('active')) {
          remainingCardsWrapper.style.display = 'block';
        } else {
          remainingCardsWrapper.style.display = 'none';
          
          const parentTarget = e.currentTarget.parentElement.parentElement.parentElement;
          parentTarget.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    }
  }

  async function initialize() {
    const response = await fetch(link?.href);

    if (response.ok) {
      const jsonData = await response.json();
      data = jsonData?.data;
      
      let sortedGroups = groupAndSortData(data);
      createCards(sortedGroups);
      return block;
    } else {
      console.log("Unable to get json data for cards portfolio");
    }
  }

  initialize();
}
