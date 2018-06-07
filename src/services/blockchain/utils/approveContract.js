import {
	LOCTokenContractWithWallet
} from '../config/contracts-config.js';

const gasConfig = require('./../config/gas-config.json');

export async function approveContract(
	wallet,
	amount,
	contractAddressToApprove,
	gasPrice) {

	const locContract = await LOCTokenContractWithWallet(wallet)
	var overrideOptions = {
		gasLimit: gasConfig.approve,
		gasPrice: gasPrice
	};
	const approve = await locContract.approve(contractAddressToApprove, amount, overrideOptions);
	return approve;
}