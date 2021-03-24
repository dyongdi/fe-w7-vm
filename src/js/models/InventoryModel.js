import { _ } from '../util.js';
import { Observable } from '../Observable.js';

class InventoryModel extends Observable {
  constructor() {
    super();
  }
}

export const walletModel = new InventoryModel();
