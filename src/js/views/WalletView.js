import { DOMTargets } from '../../main.js';
import { insertTemplate, _ } from '../util.js';
import { walletModel } from '../models/WalletModel.js';
import { makeWalletTemplate } from '../templates/HTMLTemplates.js';

class WalletView {
  constructor(DOMTargets, walletModel) {
    this.$walletArea = DOMTargets.walletLists;
    this.walletModel = walletModel;
    this.init();
  }

  init() {
    this.renderDefaultWallet();
    this.onEvents();
    this.walletModel.subscribe(this.updateView.bind(this));
  }

  renderDefaultWallet() {
    const wallet = this.walletModel.budget.myMoney;
    const myMoney = this.changeTypeObjToArr(wallet)
    const walletTemplate = myMoney.reduce((prev, [money, count]) => {
      const template = makeWalletTemplate(money, count);
      return prev += template;
    }, '');
    insertTemplate(this.$walletArea, 'beforeend', walletTemplate);
  }

  changeTypeObjToArr(wallet) {
    const myMoney = Object.keys(wallet).map(moneyType => [Number(moneyType), wallet[moneyType]]);
    return myMoney;
  }

  onEvents() {
    _.on(this.$walletArea, 'click', this.handleClickWalletArea);
  }

  handleClickWalletArea({ target }) {
    if(!target.closest('.wallet__list')) return;

  }

  updateView() {

  }
  
  render() {

  }
}

export { WalletView }