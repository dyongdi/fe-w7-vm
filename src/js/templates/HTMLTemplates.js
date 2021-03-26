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
  `;
};

const makeTotalBudgetTemplate = (totalBudget) => {
  return `
  <span>${totalBudget}원</span>
  `;
};

const makeProcessTemplate = (action, contents) => {
  if (action === 'insert') return `<li><span>${contents}원 투입!</span></li>`;
  if (action === 'return') return `<li><span>${contents}원 반환!</span></li>`;
  if (action === 'selectProduct')
    return `<li><span>${contents}를(을) 선택</span></li>`;
  if (action === 'eject')
    return `<li><span>${contents}가(이) 나왔다!</span></li>`;
};

export {
  productsTemplate,
  makeWalletTemplate,
  makeTotalBudgetTemplate,
  makeProcessTemplate,
};
