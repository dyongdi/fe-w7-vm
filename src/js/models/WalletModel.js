import { _ } from '../util.js';
import { Observable } from '../Observable.js';
import { initialBudget } from '../data/budget.js';

class WalletModel extends Observable {
  constructor(initialBudget) {
    super();
    this.budget = initialBudget;
  }

  init() {}

  useMoney(money) {
    this.budget.myMoney[money]--;
  }

  useCurrentInsertMoney(price) {
    if (this.budget.currentInsertMoney <= 0) return;
    this.budget.currentInsertMoney -= price;
  }
}

export const walletModel = new WalletModel(initialBudget);
