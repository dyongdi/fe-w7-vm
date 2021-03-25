import { _ } from '../util.js';
import { Observable } from '../Observable.js';
import { initialBudget } from '../data/budget.js';

class WalletModel extends Observable {
  constructor(initialBudget) {
    super();
    this.budget = initialBudget;
    this.insertedMoney = this.budget.currentInsertMoney;
  }

  init() {}

  useMoney(money) {
    this.budget.myMoney[money]--;
  }

  getMoneyCount(moneyUnit) {
    return this.budget.myMoney[moneyUnit];
  }

  getTotalBudget() {
    const currWallet = this.budget.myMoney;
    let totalBudget = 0;
    for(const money in currWallet) {
      totalBudget += Number(money) * currWallet[money];
    }
    return totalBudget;
  }

  getInsertedMoney() {
    return this.currentInsertMoney;
  }

  getReturnedMoney() {

  }
}

export const walletModel = new WalletModel(initialBudget);
