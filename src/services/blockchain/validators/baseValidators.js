/* eslint-disable linebreak-style */
import _ from 'lodash';

import {
    EtherValidators
} from './etherValidators';

const ERROR = require('./../config/errors.json');

export class BaseValidators {

    static validateJsonObj(jsonObj) {
        if (_.isEmpty(jsonObj)) {
            throw new Error(ERROR.INVALID_JSON);
        }

        return true;
    }

    static validateAddress(address, error) {
        if (!EtherValidators.validateEtherAddress(address)) {
            throw new Error(error);
        }

        return true;
    }

    static validatePassword(password) {
        if (password === '') {
            throw new Error(ERROR.INVALID_PASSWORD);
        }

        return true;
    }
}