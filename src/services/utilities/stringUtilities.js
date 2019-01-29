export default class StringUtils {
    static shorten(str, length) {
        if (str.length <= length) {
            return str;
        }

        return `${str.substring(0, length)}...`;
    }
  }