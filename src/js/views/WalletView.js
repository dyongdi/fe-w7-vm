import { DOMTargets } from '../../main.js';
import { _ } from '../util.js';
import { walletModel } from '../models/WalletModel.js';

class WalletView {
  constructor(DOMTargets, walletModel) {
    this.moneyBtn = DOMTargets.walletLists;
    this.model = walletModel;
    this.model.subscribe();
  }

  init() {
    this.onEvents();
  }

  onEvents() {
    _.on(this.moneyBtn, 'click', this.handleClickMoneyBtn);
  }

  handleClickMoneyBtn() {

  }

  render() {

  }
}
