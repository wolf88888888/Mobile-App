import axios from 'axios';
import {
  LOCExchangeContract,
  LOCExchangeContractWithWallet,
  getNodeProvider
} from '../config/contracts-config.js';

import {
  ExchangeValidators
} from '../validators/exchangeValidators'
import {
  approveContract
} from "../utils/approveContract";
import ethers from 'ethers';

const {
  GAS_STATION_API,
  JAVA_REST_API_SEND_FUNDS,
  nonceMaxNumber
} = require('../config/constants.json');
const gasConfig = require('../config/gas-config.json');

export async function getGasPrice() {

  try {
    let response = await axios.get(GAS_STATION_API);

    return ethers.utils.parseUnits((response.data.fast / 10).toString(10), 'gwei');

  } catch (e) {
    const nodeProvider = getNodeProvider();
    return await nodeProvider.getGasPrice();
  }
};

export async function gasToLoc(gasAmount) {
  let gasCostPrice = await getGasPrice();
  let gasCost = gasCostPrice.mul(gasAmount);
  const gasConst = ethers.utils.bigNumberify(gasCost);

  return await LOCExchangeContract.weiToLocWei(gasConst);
};

export async function exchangeLocForEth(walletAddress, walletPrivateKey, amount) {
  let result = {};
  let wallet = new ethers.Wallet(walletPrivateKey);
  const gasPrice = await getGasPrice();

  await ExchangeValidators.validateContractBalance(amount);
  const locWeiAmount = await LOCExchangeContract.weiToLocWei(amount);

  result.ApproveContractTxn = await approveContract(
    wallet,
    locWeiAmount,
    LOCExchangeContract.address,
    gasPrice
  );

  const LOCExchangeContractInstance = LOCExchangeContractWithWallet(wallet);
  const overrideOptions = {
    gasLimit: gasConfig.exchangeLocToEth,
    gasPrice: gasPrice
  };
  result.exchangeLocToEthTxn = await LOCExchangeContractInstance.exchangeLocWeiToEthWei(
    locWeiAmount, overrideOptions
  );
  const nodeProvider = getNodeProvider();
  await nodeProvider.waitForTransaction(result.exchangeLocToEthTxn.hash);
  return result;
};

export async function fundTransactionAmountIfNeeded(walletAddress, walletPrivateKey,
  actionGas = 0) {

  let result = {};
  const nodeProvider = getNodeProvider();
  let accountBalance = await nodeProvider.getBalance(walletAddress);
  let remainderForExchange = 0;

  const gasPrice = await getGasPrice();
  result.gasPrice = gasPrice;

  const gasAmountApprove = gasPrice.mul(gasConfig.approve);
  const gasAmountExchange = gasPrice.mul(gasConfig.exchangeLocToEth);
  const gasAmountNeeded = gasAmountApprove.add(gasAmountExchange);
  const gasAmountAction = gasPrice.mul(actionGas);
  let nonceNumber = await nodeProvider.getTransactionCount(walletAddress);

  if (gasAmountNeeded.gt(accountBalance) && nonceNumber < nonceMaxNumber) {
    // TODO: This should point to the backend java rest-api
    result.fundInitialGas = await axios.post(('http://localhost:8080' + JAVA_REST_API_SEND_FUNDS), {
      amount: gasAmountNeeded.toString(10),
      recipient: walletAddress
    })
    accountBalance = await nodeProvider.getBalance(walletAddress);
    remainderForExchange = gasAmountNeeded;
  }
  const minAllowedGasAmountFirst = (gasAmountAction
    .add(gasAmountNeeded));
  const minAllowedGasAmount = minAllowedGasAmountFirst.mul(gasConfig.MIN_TIMES_GAS_AMOUNT)
  if (minAllowedGasAmount.gt(accountBalance)) {
    const amountToExchange = (gasAmountAction
        .add(gasAmountApprove))
      .mul(gasConfig.TIMES_GAS_AMOUNT).add(remainderForExchange);
    amountToExchange.add(remainderForExchange);
    result.exchangeLocToEthTxn = await exchangeLocForEth(
      walletAddress,
      walletPrivateKey,
      amountToExchange
    );
  }
  return result;
}

export async function transactionCostInEth(walletAddress, actionGas = 0) {
  const gasPrice = await getGasPrice();
  const fundingCost = await checkIfFundingIsNeeded(walletAddress, actionGas);
  let transactionCost = gasPrice.mul(actionGas).add(fundingCost)
  return transactionCost;

}

export async function transactionCostInLoc(walletAddress, actionGas = 0) {

  const fundingAmount = await transactionCostInEth(walletAddress, actionGas);
  const locWeiAmount = await LOCExchangeContract.weiToLocWei(fundingAmount);
  return locWeiAmount;
}

async function checkIfFundingIsNeeded(walletAddress, actionGas = 0) {
  const nodeProvider = getNodeProvider();
  const gasPrice = await getGasPrice();
  let accountBalance = await nodeProvider.getBalance(walletAddress);
  const gasAmountApprove = gasPrice.mul(gasConfig.approve);
  const gasAmountExchange = gasPrice.mul(gasConfig.exchangeLocToEth);
  const gasAmountNeeded = gasAmountApprove.add(gasAmountExchange);

  if (gasAmountNeeded.gt(accountBalance)) {
    return gasAmountNeeded;
  }
  return 0;
}

export async function arrayToUtf8BytesArrayConverter(arrayToConvert) {
  let arrayInBytes = [];

  for (let i = 0; i < arrayToConvert.length; i++) {
    const itemInBytes = ethers.utils.toUtf8Bytes(arrayToConvert[i]);
    arrayInBytes.push(itemInBytes);
  }
  return arrayInBytes
}

export async function getNonceNumber(walletAddress) {
  const nodeProvider = getNodeProvider();
  return await nodeProvider.getTransactionCount(walletAddress);
}
