import CardsPortfolio from './cards-portfolio.js';
import CardsServices from './cards-services.js';
import CardsTeams from './cards-teams.js';

export default function decorate(block) {
  const blockHandlers = {
    'portfolio': CardsPortfolio,
    'services': CardsServices,
    'teams': CardsTeams
  };
  
  Object.keys(blockHandlers).forEach(key => {
    if (block.classList.contains(key)) {
      blockHandlers[key](block);
    }
  });
}
