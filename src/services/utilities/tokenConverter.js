class TokenConverter {

    // @tokens {string} tokens LOC tokens as string
    static locTokensToWei(tokens) {
        let index = tokens.indexOf('.');
        let trailingZeroes = 0;
        let wei = '';
        if (index === -1) {
            trailingZeroes = 18;
        } 
        else {
            trailingZeroes = 18 - (tokens.length - 1 - index);
        }

        wei = tokens.replace(/[.,]/g, '');
        if (trailingZeroes >= 0) {
            wei = wei + '0'.repeat(trailingZeroes);
        } else {
            wei = wei.substring(0, index + 18);
        }

        return wei;
    }
}

export {
    TokenConverter
};