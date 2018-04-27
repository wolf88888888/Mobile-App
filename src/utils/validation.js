export const validateName = name => !!name;

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    return re.test(email);
};

export const validatePassword = password => !!password && password.length > 7;

export const validateConfirmPassword = (password, confirmPassword) => !!password && !!confirmPassword && password === confirmPassword;
