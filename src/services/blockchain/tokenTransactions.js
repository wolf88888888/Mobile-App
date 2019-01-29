import ethers from 'ethers';
import {
  BaseValidators
} from './validators/baseValidators';
import {
  TokenValidators
} from './validators/tokenValidators';
import {
  EtherValidators
} from './validators/etherValidators'
import {
  LOCTokenContract,
  LOCTokenContractWithWallet,
  getNodeProvider
} from './config/contracts-config.js';
import {
  getGasPrice
} from "./utils/ethFuncs";
const gasConfig = require('./config/gas-config.json');
const errors = require('./config/errors.json');

import crypto from '../../../library/react-native-fast-crypto';

export class TokenTransactions {

    // static async sendTokens(jsonObj, password, recipient, amount) {
    //     BaseValidators.validateAddress(recipient, errors.INVALID_ADDRESS);

    //     let wallet = await ethers.Wallet.fromEncryptedWallet(jsonObj, password);
    //     let gasPrice = await getGasPrice();

    //     await TokenValidators.validateLocBalance(wallet.address, amount, wallet, gasConfig.transferTokens);
    //     await EtherValidators.validateEthBalance(wallet, gasConfig.transferTokens);

    //     const LOCTokenContractWallet = LOCTokenContractWithWallet(wallet);
    //     var overrideOptions = {
    //         gasLimit: gasConfig.transferTokens,
    //         gasPrice: gasPrice
    //     };
    //     return await LOCTokenContractWallet.transfer(recipient, amount, overrideOptions);

    // };

  static async sendTokens(jsonObj, password, recipient, amount) {
    let fromSignedkey;
    let fromPassword, fromSalt, fromN, fromR, fromP, fromDkLen;

    BaseValidators.validateAddress(recipient, errors.INVALID_ADDRESS);

    ethers.Wallet.fromEncryptedWalletDef(jsonObj, password,  (error, signedkey, passwd, salt, N=16384, r=8, p=1, dkLen=64) => {
        if (error != null) {
            throw error;
            return;
        }
        fromPassword = passwd;
        fromSalt = salt;
        fromN = N;
        fromR = r;
        fromP = p;
        fromDkLen = dkLen;
        fromSignedkey = signedkey;
    });

    console.log("fromPassword, fromSalt, fromN, fromR, fromP, fromDkLen", fromPassword, fromSalt, fromN, fromR, fromP, fromDkLen);

    if (fromSignedkey === null) {
        key = await crypto.scrypt(fromPassword, fromSalt, fromN, fromR, fromP, fromDkLen);
        ethers.Wallet.getSignKeyForEncryptedWalletDef(jsonObj, key, (error, signedkey) => {
            if (error != null) {
                throw error;
                return;
            }

            fromSignedkey = signedkey;
        });
    }

    let wallet = ethers.Wallet.fromEncryptedWalletProcessDef(fromSignedkey);

    let gasPrice = await getGasPrice();

    await TokenValidators.validateLocBalance(wallet.address, amount, wallet, gasConfig.transferTokens);
    await EtherValidators.validateEthBalance(wallet, gasConfig.transferTokens);

    const LOCTokenContractWallet = LOCTokenContractWithWallet(wallet);
    var overrideOptions = {
      gasLimit: gasConfig.transferTokens,
      gasPrice: gasPrice
    };
    return await LOCTokenContractWallet.transfer(recipient, amount, overrideOptions);

  };

  static async getLOCBalance(address) {
    return await LOCTokenContract.balanceOf(address);
  }

  static async getETHBalance(address) {
    const nodeProvider = getNodeProvider();
    return await nodeProvider.getBalance(address);

  }
}
