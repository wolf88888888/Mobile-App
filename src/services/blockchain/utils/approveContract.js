import {
  LOCTokenContractWithWallet
} from '../config/contracts-config.js';
import {
  getNonceNumber
} from './ethFuncs';

const gasConfig = require('./../config/gas-config.json');
const ERROR = require('./../config/errors.json');
const {
  failedSatusCode
} = require('../config/constants.json');

export async function approveContract(
  wallet,
  amount,
  contractAddressToApprove,
  gasPrice) {

  const locContract = await LOCTokenContractWithWallet(wallet)
  const allowance = await locContract.allowance(wallet.address, contractAddressToApprove)
  let nonce = await getNonceNumber(wallet.address);
  if (allowance.gte(amount)) {
    return nonce;
  }

  var overrideOptions = {
    gasLimit: gasConfig.approve,
    gasPrice: gasPrice
  };
  const approve = await locContract.approve(contractAddressToApprove, amount, overrideOptions);

  await wallet.provider.waitForTransaction(approve.hash);
  let txResult = await wallet.provider.getTransactionReceipt(approve.hash);
  if (txResult.status === failedSatusCode) {
    throw new Error(ERROR.FAILED_APPROVE);
  }

  return nonce + 1;
}
