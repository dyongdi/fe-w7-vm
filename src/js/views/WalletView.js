import { DOMTargets } from '../../main.js';
import { _ } from '../util.js';
import { walletModel } from '../models/WalletModel.js';
import { walletTemplate } from '../templates/HTMLTemplates.js';

class WalletView {
  constructor(DOMTargets, walletModel) {
    this.$walletArea = DOMTargets.walletLists;
    this.model = walletModel;
    this.model.subscribe();
    this.init();
  }

  init() {
    this.renderDefaultWallet();
    this.onEvents();
  }

  renderDefaultWallet() {
    const wallet = this.model.budget.myMoney;
    const myMoneyArr = Object.keys(wallet).map(moneyType => [Number(moneyType), myMoney[moneyType]]);
  }

  onEvents() {
    _.on(this.$walletArea, 'click', this.handleClickWalletArea);
  }

  handleClickWalletArea({ target }) {
    if(!target.closest('.wallet__list')) return;

  }
  
  render() {

  }
}

export { WalletView }