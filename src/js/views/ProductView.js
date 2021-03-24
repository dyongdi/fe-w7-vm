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

  updateView() {
    const moneyInserted = this.walletModel.getInsertedMoney();
    if (moneyInserted === 0) return;
  }
}

export { ProductView };
