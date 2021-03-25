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
    const myMoney = this.budget.myMoney[money];
    if (myMoney === 0) return;
    this.budget.myMoney[money]--;
  }

  useCurrentInsertMoney(price) {
    if (this.budget.currentInsertMoney <= 0) return;
    this.budget.currentInsertMoney -= price;
  }

  getMoneyCount(moneyUnit) {
    const currentMoneyUnitCount = this.budget.myMoney[moneyUnit];
    return currentMoneyUnitCount;
  }

  getTotalBudget() {
    const currWallet = this.budget.myMoney;
    let totalBudget = 0;
    for (const money in currWallet) {
      totalBudget += Number(money) * currWallet[money];
    }
    return totalBudget;
  }

  getInsertedMoney() {
    return this.currentInsertMoney;
  }

  getReturnedMoney() {}
}

export const walletModel = new WalletModel(initialBudget);
