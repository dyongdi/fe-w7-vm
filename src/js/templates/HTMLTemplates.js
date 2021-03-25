const productsTemplate = (productName, price) => {
  return `
  <li class="product">
  <button class="product__name">
  <span>${productName}</span>
  </button>
  <div class="price"><span>${price}</span></div>
  </li>`;
};

const walletTemplate = (moneyType, count) => {
  return `
  <li class="wallet__list">
    <div><span>${moneyType}</span></div>
    <div><span>${count}</span></div>
  </li>
  `
}

export { productsTemplate, walletTemplate };
