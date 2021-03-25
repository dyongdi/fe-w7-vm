const productsTemplate = (productName, price) => {
  return `
  <li class="product">
  <button class="product__name">
  <span>${productName}</span>
  </button>
  <div class="price"><span>${price}</span></div>
  </li>`;
};

const makeWalletTemplate = (moneyType, count) => {
  return `
  <li class="wallet__list">
    <button class="money__button"><span>${moneyType}원</span></button>
    <div><span>${count}개</span></div>
  </li>
  `
}

export { productsTemplate, makeWalletTemplate };
