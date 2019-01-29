import {
  HotelReservationFactoryContract,
  SimpleReservationMultipleWithdrawersContract
} from '../config/contracts-config';
import {
  addDaysToNow,
  formatTimestamp,
  formatTimestampToDays
} from '../utils/timeHelper';

import ethers from 'ethers';

const ERROR = require('./../config/errors.json');
const {
  maxRefundPeriods,
  yearsForTimeValidation,
  timestampInSecondsLength,
  bytesParamsLength,
  timestampInDaysLength,
  yearInDays,
  leapYearDay,
  secondsInMilliSeconds
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
    if (daysBeforeStartForRefund.length !== refundPercentages.length) {
      throw new Error(ERROR.INVALID_REFUND_PARAMS_LENGTH);
    }

    if (hotelReservationId > bytesParamsLength || hotelId > bytesParamsLength || roomId > bytesParamsLength) {
      throw new Error(ERROR.INVALID_ID_PARAM)
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

  static async validateSimpleReservationCustomWithdrawerParams(jsonObj,
    password,
    hotelReservationId,
    reservationCostLOC,
    withdrawDateInSecondsFormatted,
    recipientAddress) {
    if (!jsonObj ||
      !password ||
      !hotelReservationId ||
      !reservationCostLOC ||
      reservationCostLOC * 1 <= 0 ||
      !withdrawDateInSecondsFormatted ||
      !recipientAddress
    ) {
      throw new Error(ERROR.INVALID_PARAMS);
    }

    if ((Date.now() / secondsInMilliSeconds | 0) > withdrawDateInSecondsFormatted) {
      throw new Error(ERROR.INVALID_WITHDRAW_DATE);
    }

    if (hotelReservationId > bytesParamsLength) {
      throw new Error(ERROR.INVALID_ID_PARAM)
    }

    await this.validateSimpleReservationMultipleWithdrawersDontExist(hotelReservationId);
    this.validateWithdrawDate(withdrawDateInSecondsFormatted)

    return true;
  }

  static async validateSimpleReservationSingleWithdrawerParams(jsonObj, password, reservationCostLOC, withdrawDateInDays) {
    if (!jsonObj ||
      !password ||
      !reservationCostLOC ||
      reservationCostLOC * 1 <= 0 ||
      !withdrawDateInDays
    ) {
      throw new Error(ERROR.INVALID_PARAMS);
    }
    let currentTimestamp = (Date.now() / secondsInMilliSeconds | 0)

    if (formatTimestampToDays(currentTimestamp) >= withdrawDateInDays) {
      throw new Error(ERROR.INVALID_WITHDRAW_DATE);
    }

    this.validateWithdrawDateInDays(withdrawDateInDays);
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
    const nowUnixFormatted = formatTimestamp(new Date().getTime() / secondsInMilliSeconds | 0);
    let dayInSeconds = 60 * 60 * 24;
    let yearsPeriodInSeconds = ((dayInSeconds * yearInDays) + (leapYearDay * 2)) * yearsForTimeValidation;
    if (reservationStartDate < nowUnixFormatted || reservationStartDate > (nowUnixFormatted + yearsPeriodInSeconds) || reservationStartDate.toString().length !== timestampInSecondsLength) {
      throw new Error(ERROR.INVALID_PERIOD_START);
    }

    if (reservationStartDate >= reservationEndDate) {
      throw new Error(ERROR.INVALID_PERIOD);
    }

    if (reservationEndDate > (nowUnixFormatted + yearsPeriodInSeconds) || reservationEndDate.toString().length !== timestampInSecondsLength) {
      throw new Error(ERROR.INVALID_PERIOD_END);
    }


    for (let i = 0; i < daysBeforeStartForRefund.length; i++)
      if ((nowUnixFormatted + (daysBeforeStartForRefund[i] * dayInSeconds)) > reservationStartDate) {
        throw new Error(ERROR.INVALID_REFUND_DAYS);
      }

    return true;
  }

  static validateWithdrawDate(withdrawDate) {
    const nowUnixFormatted = formatTimestamp(new Date().getTime() / secondsInMilliSeconds | 0);
    let dayInSeconds = 60 * 60 * 24;
    let yearsPeriodInSeconds = ((dayInSeconds * yearInDays) + (leapYearDay * 2)) * yearsForTimeValidation;

    if (withdrawDate > (nowUnixFormatted + yearsPeriodInSeconds) || withdrawDate.toString().length !== timestampInSecondsLength) {
      throw new Error(ERROR.INVALID_WITHDRAW_DATE);
    }
  }

  static validateWithdrawDateInDays(withdrawDate) {
    const nowDaysFormatted = formatTimestampToDays(new Date().getTime() / secondsInMilliSeconds | 0);
    let dayInSeconds = 60 * 60 * 24;
    let yearsPeriodInSeconds = ((dayInSeconds * yearInDays) + (leapYearDay * 2)) * yearsForTimeValidation;
    if (withdrawDate > (nowDaysFormatted + yearsPeriodInSeconds) || withdrawDate.toString().length !== timestampInDaysLength) {
      throw new Error(ERROR.INVALID_WITHDRAW_DATE);
    }
  }

  static async validateSimpleReservationMultipleWithdrawersDontExist(hotelReservationId) {
    let recipientAddress = await SimpleReservationMultipleWithdrawersContract.reservations(hotelReservationId);
    if (recipientAddress[0] === '0x0000000000000000000000000000000000000000') {
      return true;
    }
    throw new Error(ERROR.EXISTING_BOOKING);
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
      let daysBeforeStartForRefundAddedToNow = addDaysToNow(+daysBeforeStartForRefund[i]).getTime() / secondsInMilliSeconds | 0;
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
    const currentTimestamp = Date.now() / secondsInMilliSeconds | 0;
    if (customerAddress !== senderAddress || currentTimestamp < reservationStartDate || currentTimestamp > reservationEndDate) {
      throw new Error(ERROR.INVALID_DISPUTE);
    }

    if (isDisputeOpen === true) {
      throw new Error(ERROR.ALREADY_OPENED_DISPUTE);
    }
    return true;
  }

  static async validateWithdrawFunds(jsonObj, password, reservationIdsArrayBytes, senderAddress) {
    if (!jsonObj || !password || !reservationIdsArrayBytes || reservationIdsArrayBytes.length < 1) {
      throw new Error(ERROR.INVALID_PARAMS);
    }
    const currentTimestamp = Date.now() / secondsInMilliSeconds | 0;

    for (let i = 0; i < reservationIdsArrayBytes.length; i++) {
      if (reservationIdsArrayBytes[i] > bytesParamsLength) {
        throw new Error(ERROR.INVALID_ID_PARAM)
      }
      let reservationMapping = await SimpleReservationMultipleWithdrawersContract.reservations(reservationIdsArrayBytes[i]);

      if (reservationMapping[2].toString() > currentTimestamp) {
        throw new Error(ERROR.INVALID_DATE_FOR_WITHDRAW)
      }

      if (reservationMapping[0] !== senderAddress) {
        throw new Error(ERROR.INVALID_WITHDRAWER)
      }

      if (reservationMapping[1] === 0) {
        throw new Error(ERROR.INVALID_BOOKING_FOR_WITHDRAW)
      }
    }

    let maxAllowedCyclesForWithdraw = await SimpleReservationMultipleWithdrawersContract.maxAllowedWithdrawCyclesCount();

    if (reservationIdsArrayBytes.length > maxAllowedCyclesForWithdraw.toString()) {
      throw new Error(ERROR.WITHDRAW_ARRAY_GREATER_THAN_POSSIBLE)
    }

    return true;
  }
}
