import { _ } from './js/util.js';
import { ProductView } from './js/views/ProductView.js';
import { productModel } from './js/models/ProductModel.js';
import { walletModel } from './js/models/WalletModel.js';

const DOMTargets = {
  productLists: _.$('.products'),
  walletLists: _.$('.wallet__lists'),
};

const main = () => {
  new ProductView(DOMTargets, productModel, walletModel);
};

main();
