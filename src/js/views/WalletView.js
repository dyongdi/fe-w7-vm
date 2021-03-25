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
    _.on(this.$walletArea, 'click', this.handleClickWalletArea.bind(this));
  }

  handleClickWalletArea({ target }) {
    if(!target.closest('.wallet__list')) return;
    const money = this.getMoneyUnit(target);
    console.log(money);
    this.walletModel.useMoney(money);
    this.walletModel.notify(money);
  }

  getMoneyUnit(target) {
    const money = target.closest('.money__button').textContent.slice(0, -1);
    return Number(money);
  }

  updateView(money) {
    this.changeMoneyUnitCount(money);
  }

  changeMoneyUnitCount(money) {
    const clickedMoneyUnits = Array.from(_.$All('.money__button'));
    const clickedMoneyUnit = clickedMoneyUnits.filter((unit) => {
      const moneyUnit = Number(unit.textContent.slice(0, -1));
      return moneyUnit === money;
    })[0];
    const clickedMoneyCount = clickedMoneyUnit.nextElementSibling;
    const currentMoneyUnitCount = this.walletModel.getMoneyCount(money);
    clickedMoneyCount.textContent = `${currentMoneyUnitCount}개`;
  }
}

export { WalletView }