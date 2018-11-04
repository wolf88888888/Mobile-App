/* eslint-disable linebreak-style */


import ethers from 'ethers';
import {
  BaseValidators
} from './validators/baseValidators';
import {
  LOCTokenContract,
  getNodeProvider
} from './config/contracts-config.js';

const ERROR = require('./config/errors.json');

class Wallet {

  static async getTokenBalance(address) {
    let balance = await LOCTokenContract.balanceOf(address);
    return balance;
  }

  static async getBalance(address) {
    const nodeProvider = getNodeProvider();
    let balance = await nodeProvider.getBalance(address);
    return balance;
  }

  static async createFromPassword(password) {
    BaseValidators.validatePassword(password);

    const mnemonic = await ethers.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));

    return await this.generateAccountFromMnemonicEthers(mnemonic, password, () => {});
  }

  static async recoverFromMnemonic(mnemonic, password, address) {
    BaseValidators.validatePassword(password);
    BaseValidators.validateAddress(address, ERROR.INVALID_RECOVERED_ADDRESS);
    this.validateMnemonic(mnemonic);

    let result = await this.generateAccountFromMnemonicEthers(mnemonic, password, () => {});

    if (result.address !== address) {
      throw ERROR.INVALID_RECOVERED_ADDRESS;
    }
    return result;
  }

  static async generateAccountFromMnemonicEthers(mnemonic, _newPassword, progressCallback) {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);

    const encryptPromise = wallet.encrypt(_newPassword, progressCallback);

    const json = await encryptPromise;
    return {
      address: wallet.address,
      fileName: JSON.parse(json)['x-ethers'].gethFilename,
      jsonFile: JSON.parse(json),
      mnemonic
    };
  }

  static validateMnemonic(mnemonic) {
    if (!ethers.HDNode.isValidMnemonic(mnemonic)) {
      throw ERROR.INVALID_MNEMONIC;
    }

    return true;
  }
}

export {
  Wallet
};
