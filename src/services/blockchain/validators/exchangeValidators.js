import {
  LOCExchangeContract,
  getNodeProvider
} from '../config/contracts-config.js';

const ERROR = require('./../config/errors.json');

export class ExchangeValidators {

  static async validateContractBalance(amount) {
    const nodeProvider = getNodeProvider();
    const balance = await nodeProvider.getBalance(LOCExchangeContract.address);
    if (amount.gt(balance)) {
      throw ERROR.INSUFFICIENT_AMOUNT_ETH_EXCHANGE_CONTRACT
    }
  };
}
