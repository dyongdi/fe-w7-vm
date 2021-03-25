import { _, insertTemplate } from '../util';
import { productsTemplate } from '../templates/HTMLTemplates.js';

class ProductView {
  constructor({ productLists }, productModel, walletModel) {
    this.productModel = productModel;
    this.walletModel = walletModel;
    this.products = productModel.products;
    this.$productLists = productLists;
    this.init();
  }

  init() {
    this.renderDefaultProductLists();
    this.onEvents();
    this.walletModel.subscribe(this.updateView.bind(this));
  }

  onEvents() {
    _.on(this.$productLists, 'click', this.handleClickProduct.bind(this));
  }

  handleClickProduct({ target }) {
    if (!target.closest('.product__name')) return;
  }

  renderDefaultProductLists() {
    const defaultTemplate = this.products.reduce((prev, product) => {
      const template = productsTemplate(product.name, product.price);
      return prev + template;
    }, '');
    insertTemplate(this.$productLists, 'beforeend', defaultTemplate);
  }

  updateView({ currentInsertMoney }) {
    const priceLists = this.getPriceLists();
    if (currentInsertMoney === 0) {
      return this.clearProductAvailability(priceLists);
    }
    this.isProductAvailable(priceLists, currentInsertMoney);
  }

  getPriceLists() {
    const priceLists = Array.from(_.$All('.price'));
    return priceLists;
  }

  isProductAvailable(priceLists, currentInsertMoney) {
    const productSelected = priceLists
      .filter((price) => Number(price.textContent) <= currentInsertMoney)
      .map((price) => price.previousElementSibling);
    this.changeAvailability(productSelected);
  }

  changeAvailability(products) {
    products.forEach((product) => _.addClass(product, 'available'));
  }

  clearProductAvailability(priceLists) {
    priceLists.forEach((list) => {
      const product = list.previousSibling;
      product.classLists?.remove('available');
    });
  }
}

export { ProductView };
