var valid = require('card-validator');
export const validateName = name => !!name;

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(email);
};

export const validatePassword = (password) => {
    const re = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; // eslint-disable-line
    return re.test(password);
};
// = password => !!password && password.length > 7;

export const hasLetterAndNumber = (password) => {
    const re = /^(?=.*?[A-Z a-z])(?=.*?[0-9])/; // eslint-disable-line
    return re.test(password);
};

export const hasLetter = (password) => {
    const re = /^(?=.*?[A-Z a-z])/; // eslint-disable-line
    return re.test(password);
};

export const hasSymbol = (password) => {
    const re = /^(?=.*?[#?!@$%^&*-]).{8,}$/; // eslint-disable-line
    return re.test(password);
};

export const validatePassword1 = (password) => {
    const re = /^(?=.*?[A-Z, a-z])(?=.*?[0-9]).{8,}$/; // eslint-disable-line
    return re.test(password);
};

export const validateNumberic = (number) => {
    const re =  /^-{0,1}\d*\.{0,1}\d+$/; // eslint-disable-line
    return re.test(number);
}

export const validateEmptyString = (str) => {
    return (!str || /^\s*$/.test(str));
}
export const validateCardNumber = (card) => {
    var cardNumber = valid.number(card);
    return cardNumber.isValid;
};

export const validateCardExpiry = (cardExpiry) => {
    var expirationDateValidation = valid.expirationDate(cardExpiry);
    return expirationDateValidation.isValid;
};

export const validateCVV = (cvv) => {
    var cvv = valid.cvv(cvv);
    return cvv.isValid;
};

export const validateConfirmPassword = (password, confirmPassword) => !!password && !!confirmPassword && password === confirmPassword;
