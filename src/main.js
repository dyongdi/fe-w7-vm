import { _ } from './js/util.js';
import { ProductView } from './js/views/ProductView.js';
import { productModel } from './js/models/ProductModel.js';

const DOMTargets = {
  productLists: _.$('.products'),
};

const main = () => {
  new ProductView(DOMTargets, productModel);
};

main();
