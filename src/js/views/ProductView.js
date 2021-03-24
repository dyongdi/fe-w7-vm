import { _, insertTemplate } from '../util';
import { productsTemplate } from '../templates/HTMLTemplates.js';

class ProductView {
  constructor({ productLists }, productModel) {
    this.productModel = productModel;
    this.products = productModel.products;
    this.$productLists = productLists;
    this.init();
  }

  init() {
    this.renderDefaultProductLists();
  }

  renderDefaultProductLists() {
    const defaultTemplate = this.products.reduce((prev, product) => {
      const template = productsTemplate(product.name, product.price);
      return prev + template;
    }, '');
    insertTemplate(this.$productLists, 'beforeend', defaultTemplate);
  }
}

export { ProductView };
