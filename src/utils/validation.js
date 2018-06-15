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

export const hasSymbol = (password) => {
    const re = /^(?=.*?[#?!@$%^&*-]).{8,}$/; // eslint-disable-line
    return re.test(password);
};

export const validatePassword1 = (password) => {
    const re = /^(?=.*?[A-Z, a-z])(?=.*?[0-9]).{8,}$/; // eslint-disable-line
    return re.test(password);
};

export const validateConfirmPassword = (password, confirmPassword) => !!password && !!confirmPassword && password === confirmPassword;
