import { _ } from './js/util.js';
import { ProductView } from './js/views/ProductView.js';
import { productModel } from './js/models/ProductModel.js';
import { walletModel } from './js/models/WalletModel.js';
import { WalletView } from './js/views/WalletView.js';
import { InsertMoneyView } from './js/views/InsertMoneyView.js';

const DOMTargets = {
  productLists: _.$('.products'),
  walletLists: _.$('.wallet__lists'),
  budget: _.$('.budget'),
  insertView: _.$('.money'),
  returnButton: _.$('.screen__button'),
};

const main = () => {
  new ProductView(DOMTargets, productModel, walletModel);
  new WalletView(DOMTargets, walletModel);
  new InsertMoneyView(DOMTargets, walletModel);
};

main();
