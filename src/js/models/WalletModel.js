import { _ } from '../util.js';
import { Observable } from '../Observable.js';
import { initialBudget } from '../data/budget.js';

class WalletModel extends Observable {
  constructor(initialBudget) {
    super();
    this.budget = initialBudget;
    this.insertedMoney = 0;
  }

  init() {}

  getTotalBudget() {
    const currWallet = this.budget.myMoney;
    let totalBudget;
    for(const money in currWallet) {
      totalBudget += money * currWallet[money];
    }
    return totalBudget;
  }

  getinsertedMoney(money) {
    this.budget -= money;
    
  }

  getReturnedMoney() {

  }
}

export const walletModel = new WalletModel(initialBudget);
