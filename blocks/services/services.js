
export default function decorate(block) { 
  const servicesInfoContainer = document.createElement("div");
  const servicesCardContainer = document.createElement("div");
  servicesInfoContainer.classList.add('services-info-container');
  servicesCardContainer.classList.add('services-card-container');

  servicesInfoContainer.appendChild(block.children[0]);

  while (block.children.length > 0) {
      servicesCardContainer.appendChild(block.children[0]);
  }

  [...servicesCardContainer.children].forEach((child) => {
    child.classList.add('service-card');
    const imageWrapper = child.querySelector('div:first-of-type');
    imageWrapper.classList.add('image-wrapper');
    const infoWrapper = child.querySelector('div:last-of-type');
    infoWrapper.classList.add('info-wrapper');
  });

  block.appendChild(servicesInfoContainer);
  block.appendChild(servicesCardContainer);
}
