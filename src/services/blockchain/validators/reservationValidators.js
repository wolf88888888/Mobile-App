import {
	addDaysToNow,
	formatStartDateTimestamp,
	formatTimestamp
} from "../utils/timeHelper";
import {
	HotelReservationFactoryContract
} from "../config/contracts-config";
import {
	BaseValidators
} from "./baseValidators";
import ethers from 'ethers';

const ERROR = require('./../config/errors.json');
const {
	maxRefundPeriods
} = require('../config/constants.json');

export class ReservationValidators {



	static async validateReservationParams(jsonObj,
		password,
		hotelReservationId,
		reservationCostLOC,
		reservationStartDate,
		reservationEndDate,
		daysBeforeStartForRefund,
		refundPercentages,
		hotelId,
		roomId,
		numberOfTravelers) {
		if (!jsonObj ||
			!password ||
			!hotelReservationId ||
			!reservationCostLOC ||
			reservationCostLOC * 1 < 0 ||
			!reservationStartDate ||
			!reservationEndDate ||
			!daysBeforeStartForRefund ||
			daysBeforeStartForRefund * 1 < 0 ||
			!refundPercentages ||
			!hotelId ||
			!roomId ||
			!numberOfTravelers
		) {
			throw new Error(ERROR.INVALID_PARAMS);
		}
		if (daysBeforeStartForRefund.length != refundPercentages.length) {
			throw new Error(ERROR.INVALID_REFUND_PARAMS_LENGTH);
		}
		if ((daysBeforeStartForRefund.length > maxRefundPeriods) ||
			(daysBeforeStartForRefund.length < 0) ||
			(refundPercentages.length > maxRefundPeriods) ||
			(refundPercentages.length < 0)) {
			throw new Error(ERROR.INVALID_REFUND_PARAMS)
		}

		for (let i = 0; i < daysBeforeStartForRefund.length - 1; i++) {
			if ((daysBeforeStartForRefund[i] * 1) < (daysBeforeStartForRefund[i + 1] * 1)) {
				throw new Error(ERROR.INVALID_REFUND_DAYS_ARRAY);
			}
		}

		for (let i = 0; i < refundPercentages.length; i++) {
			if (refundPercentages[i] * 1 > 100 || refundPercentages[i] * 1 < 0) {
				throw new Error(ERROR.INVALID_REFUND_AMOUNT);
			}
		}



		await this.validateBookingDoNotExists(hotelReservationId);

		this.validateReservationDates(reservationStartDate, reservationEndDate, daysBeforeStartForRefund);

		return true;

	}

	static async validateBookingExists(hotelReservationId) {
		await this.isHotelReservationIdEmpty(hotelReservationId);
		const bookingContractAddress = await HotelReservationFactoryContract.getHotelReservationContractAddress(
			ethers.utils.toUtf8Bytes(hotelReservationId)
		);
		if (bookingContractAddress === '0x0000000000000000000000000000000000000000') {
			throw ERROR.MISSING_BOOKING;
		}

		return bookingContractAddress;
	}

	static isHotelReservationIdEmpty(hotelReservationId) {
		if (hotelReservationId === '') {
			throw ERROR.MISSING_RESERVATION_ID;
		}
	}

	static async validateBookingDoNotExists(hotelReservationId) {
		let bookingAddress = await HotelReservationFactoryContract.getHotelReservationContractAddress(
			hotelReservationId
		);

		if (bookingAddress === '0x0000000000000000000000000000000000000000') {
			return true;
		}

		throw new Error(ERROR.EXISTING_BOOKING);
	}

	static validateReservationDates(reservationStartDate, reservationEndDate, daysBeforeStartForRefund) {
		const nowUnixFormatted = formatTimestamp(new Date().getTime() / 1000 | 0);
		if (reservationStartDate < nowUnixFormatted) {
			throw new Error(ERROR.INVALID_PERIOD_START);
		}

		if (reservationStartDate >= reservationEndDate) {
			throw new Error(ERROR.INVALID_PERIOD);
		}
		let day = 60 * 60 * 24;

		for (let i = 0; i < daysBeforeStartForRefund.length; i++)
			if ((nowUnixFormatted + (daysBeforeStartForRefund[i] * day)) > reservationStartDate) {
				throw new Error(ERROR.INVALID_REFUND_DAYS);
			}

		return true;
	}

	static validateCancellation(refundPercentages,
		daysBeforeStartForRefund,
		reservationStartDate,
		customerAddress,
		senderAddress) {

		refundPercentages = +refundPercentages;
		reservationStartDate = +reservationStartDate;
		customerAddress = customerAddress.toLowerCase();
		senderAddress = senderAddress.toLowerCase();

		for (let i = 0; i < daysBeforeStartForRefund.length; i++) {
			let daysBeforeStartForRefundAddedToNow = addDaysToNow(+daysBeforeStartForRefund[i]).getTime() / 1000 | 0;
			if (refundPercentages[i] <= 0 ||
				daysBeforeStartForRefundAddedToNow > reservationStartDate ||
				customerAddress !== senderAddress) {
				throw new Error(ERROR.INVALID_CANCELLATION);
			}
		}
		return true;
	}

	static validateDispute(senderAddress, customerAddress, reservationStartDate, reservationEndDate, isDisputeOpen) {

		customerAddress = customerAddress.toLowerCase();
		senderAddress = senderAddress.toLowerCase();
		const currentTimestamp = Date.now() / 1000 | 0;
		if (customerAddress !== senderAddress || currentTimestamp < reservationStartDate || currentTimestamp > reservationEndDate) {
			throw new Error(ERROR.INVALID_DISPUTE);
		}

		if (isDisputeOpen == true) {
			throw new Error(ERROR.ALREADY_OPENED_DISPUTE);
		}
		return true;
	}
}