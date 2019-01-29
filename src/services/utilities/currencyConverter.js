class CurrencyConverter {
    static convert(exchangeRates, from, to, quantity) {
        return quantity * exchangeRates[from][to];
    }
}

export {
    CurrencyConverter
};