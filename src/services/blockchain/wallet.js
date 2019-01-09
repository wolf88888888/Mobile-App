import ethers from 'ethers';
import {
  BaseValidators
} from './validators/baseValidators';
import {
  LOCTokenContract,
  getNodeProvider
} from './config/contracts-config.js';
import crypto from '../../../library/react-native-fast-crypto';

// import ERROR from './config/errors.json';
const ERROR = require('./config/errors.json');

class Wallet {
  static async getTokenBalance(address) {
    let balance = await LOCTokenContract.balanceOf(address);
    return balance;
  }

  static async getBalance(address) {
    const nodeProvider = getNodeProvider();
    console.log("node provider ");
    console.log(nodeProvider);
    let balance = await nodeProvider.getBalance(address);
    return balance;
  }

  static async createFromPassword(password) {
    BaseValidators.validatePassword(password);

    const mnemonic = await ethers.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));

    //return await this.generateAccountFromMnemonicEthers(mnemonic, password, () => { });
    return await this.generateAccountFromMnemonicEthersDef(mnemonic, password);
  }

  static async recoverFromMnemonic(mnemonic, password, address) {
    BaseValidators.validatePassword(password);
    BaseValidators.validateAddress(address, ERROR.INVALID_RECOVERED_ADDRESS);
    this.validateMnemonic(mnemonic);

    //let result = await this.generateAccountFromMnemonicEthers(mnemonic, password, () => { });
    let result = await this.generateAccountFromMnemonicEthersDef(mnemonic, password);

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

  static async generateAccountFromMnemonicEthersDef(mnemonic, _newPassword) {
    let fromPassword, fromSalt, fromN, fromR, fromP, fromDkLen, fromClient, fromEntropy, fromPrivateKey, fromIV, fromUuidRandom;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    wallet.encryptDef(_newPassword, (passwd, salt, N=16384, r=8, p=1, dkLen=64, client, entropy, privateKey, iv, uuidRandom) => {
      fromPassword = passwd;
      fromSalt = salt;
      fromN = N;
      fromR = r;
      fromP = p;
      fromDkLen = dkLen;
      
      fromClient = client;
      fromEntropy = entropy;
      fromPrivateKey = privateKey;
      fromIV = iv;
      fromUuidRandom = uuidRandom;
    });
    const key = await crypto.scrypt(fromPassword, fromSalt, fromN, fromR, fromP, fromDkLen);
    const encryptPromise = wallet.encryptContinue(fromSalt, fromN, fromR, fromP, fromClient, fromEntropy, key, fromPrivateKey, fromIV, fromUuidRandom);
    const json = encryptPromise;
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

export {Wallet};