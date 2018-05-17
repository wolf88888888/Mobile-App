import {
	Config
} from './../../../config';
import ethers from 'ethers';
import StandardToken from './contracts-json/StandardToken.json';
import LOCExchangeContractJSON from './contracts-json/LOCExchange.json';
import IHotelReservationFactory from './contracts-json/IHotelReservationFactory.json';
import IHotelReservation from './contracts-json/IHotelReservation.json';

const providers = ethers.providers;

export function getNodeProvider() {
	let currentNetwork = Config.getValue('ETHERS_HTTP_PROVIDER_NETWORK')
	if (currentNetwork === 'local') {
		return new providers.JsonRpcProvider(Config.getValue('ETHERS_HTTP_PROVIDER_LOCAL'), providers.networks.unspecified);
	}
	return new providers.InfuraProvider(providers.networks[currentNetwork], Config.getValue('INFURA_API_KEY'));

}

const nodeProvider = getNodeProvider();

/**
 * Creation of LOCTokenContract object
 * @type {ethers.Contract}
 */

export let LOCTokenContract = new ethers.Contract(
	Config.getValue('LOCTokenContract'), StandardToken.abi, nodeProvider);

export function LOCTokenContractWithWallet(wallet) {
	wallet.provider = nodeProvider;

	return new ethers.Contract(Config.getValue('LOCTokenContract'), StandardToken.abi, wallet);
}

/**
 * Creation of LOCExchangeContract object
 * @type {ethers.Contract}
 */

export let LOCExchangeContract = new ethers.Contract(Config.getValue('LOCExchange'), LOCExchangeContractJSON.abi, nodeProvider);

export function LOCExchangeContractWithWallet(wallet) {
	wallet.provider = nodeProvider;

	return new ethers.Contract(Config.getValue('LOCExchange'), LOCExchangeContractJSON.abi, wallet);
}

/**
 * Creation of HotelReservationFactoryContract object
 * @type {ethers.Contract}
 */

export let HotelReservationFactoryContract = new ethers.Contract(
	Config.getValue('HotelReservationFactoryProxy'), IHotelReservationFactory.abi, nodeProvider);


export function HotelReservationFactoryContractWithWallet(wallet) {
	wallet.provider = nodeProvider;
	return new ethers.Contract(Config.getValue('HotelReservationFactoryProxy'), IHotelReservationFactory.abi, wallet);
}

/**
 * Creation of HotelReservationContract object
 * @type {ethers.Contract}
 */

export function initHotelReservationContract(hotelReservationContractAddress) {
	return new ethers.Contract(
		hotelReservationContractAddress, IHotelReservation.abi, nodeProvider)

};