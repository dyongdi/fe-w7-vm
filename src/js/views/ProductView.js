import { _, insertTemplate, delay } from '../util';
import {
  productsTemplate,
  makeProcessTemplate,
} from '../templates/HTMLTemplates.js';

class ProductView {
  constructor(DOMTargets, productModel, walletModel) {
    this.productModel = productModel;
    this.walletModel = walletModel;
    this.products = productModel.products;
    this.$productLists = DOMTargets.productLists;
    this.$screen = DOMTargets.processScreen;
    this.init();
  }

  init() {
    this.renderDefaultProductLists();
    this.onEvents();
    this.walletModel.subscribe(this.updateProductView.bind(this));
  }

  onEvents() {
    _.on(this.$productLists, 'click', this.handleClickProduct.bind(this));
  }

  handleClickProduct({ target }) {
    if (!target.closest('.available')) return;
    const product = target.closest('.product__name');
    const productName = product.textContent.trim();
    const productPrice = product.nextElementSibling.textContent;
    this.walletModel.useCurrentInsertMoney(productPrice);
    this.walletModel.debounceReturnMoney();
    this.productModel.updateInventory(productName);
    this.updateProdcessView('selectProduct', productName);
    this.updateProdcessView('eject', productName);
  }

  renderDefaultProductLists() {
    const defaultTemplate = this.products.reduce((prev, product) => {
      const template = productsTemplate(product.name, product.price);
      return prev + template;
    }, '');
    insertTemplate(this.$productLists, 'beforeend', defaultTemplate);
  }

  updateProductView({ currentInsertMoney }) {
    const priceLists = this.getPriceLists();
    const allProducts = this.getProducts();
    this.clearProductAvailability(priceLists, currentInsertMoney);
    this.isProductAvailable(priceLists, currentInsertMoney);
    this.checkInventory(allProducts);
  }

  getPriceLists() {
    const priceLists = Array.from(_.$All('.price'));
    return priceLists;
  }

  getProducts() {
    const allProducts = Array.from(_.$All('.product__name'));
    return allProducts;
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

  removeAvailability(products) {
    products.forEach((product) => _.rmClass(product, 'available'));
  }

  isOutofStock(products) {
    products.forEach((product) => {
      _.addClass(product, 'zero-inventory');
      product.disabled = true;
    });
  }

  clearProductAvailability(priceLists) {
    const productSelected = priceLists.map(
      (price) => price.previousElementSibling
    );
    this.removeAvailability(productSelected);
  }

  getZeroProductsNames() {
    const zeroProductsName = this.productModel.products
      .filter((product) => product.inventory === 0)
      .map((product) => product.name);
    return zeroProductsName;
  }

  checkInventory(allProducts) {
    const zeroProductsNames = this.getZeroProductsNames();
    const productsOutofStock = zeroProductsNames
      .map((productName) => {
        return allProducts.filter(
          (product) => product.textContent.trim() === productName
        );
      })
      .flat();
    if (productsOutofStock.length === 0) return;
    this.isOutofStock(productsOutofStock);
  }

  async updateProdcessView(action, product) {
    if (action === 'eject') await delay(2000);
    const processTemplate = makeProcessTemplate(action, product);
    insertTemplate(this.$screen, 'beforeend', processTemplate);
  }
}

export { ProductView };
