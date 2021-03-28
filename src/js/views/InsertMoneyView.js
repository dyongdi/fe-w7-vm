import { _, insertTemplate } from '../util.js';
import { makeProcessTemplate } from '../templates/HTMLTemplates.js';

class InsertMoneyView {
  constructor({ insertView, returnButton, processScreen }, walletModel) {
    this.walletModel = walletModel;
    this.$insertView  = insertView;
    this.$returnButton = returnButton;
    this.$screen = processScreen;
    this.init();
  }

  init() {
    this.walletModel.subscribe(this.updateView.bind(this));
    this.onEvents();
  }

  updateView({ currentInsertMoney }) {
    if(currentInsertMoney === undefined) {
      currentInsertMoney = 0;
    }
    this.$insertView.textContent = `${currentInsertMoney}원`
  }

  onEvents() {
    _.on(this.$returnButton, 'click', this.handleClickReturnBtn.bind(this));
  }

  handleClickReturnBtn({target}) {
    const budget = this.walletModel.budget;
    const notifyCallback = () => this.walletModel.notify(budget)
    this.updateProdcessView('return', this.walletModel.budget.currentInsertMoney);
    this.walletModel.returnMoney(notifyCallback);
  }

  updateProdcessView(action, money) {
    const processTemplate = makeProcessTemplate(action, money);
    insertTemplate(this.$screen, 'beforeend', processTemplate);
  }
}

export { InsertMoneyView }