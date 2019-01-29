import {
  LOCTokenContract
} from '../config/contracts-config.js';
import ethers from 'ethers';

const ERROR = require('./../config/errors.json');


export class TokenValidators {

  static async validateLocBalance(account, locAmount) {
    //     const gasAmountApprove = ethers.utils.bigNumberify(gasConfig.approve);
    //     const gasAmountAction = ethers.utils.bigNumberify(actionGas);
    //     const totalGas = gasAmountApprove.add(gasAmountAction);

    //     const totalGasLoc = (await gasToLoc(totalGas));
    //     const locAmountGasToValidate = totalGasLoc.mul(TIMES_GAS_AMOUNT);
    //     const locAmountToValidate = locAmountGasToValidate.add(locAmount);

    locAmount = ethers.utils.bigNumberify(locAmount);
    let balance = await LOCTokenContract.balanceOf(account);
    if (locAmount.gt(balance)) {
      throw ERROR.INSUFFICIENT_AMOUNT_LOC;
    }
  }
}
