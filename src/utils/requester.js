import { AsyncStorage } from 'react-native';
import { apiHost, domainPrefix } from '../config';

const host = apiHost;
const { fetch } = global;
const RequestMethod = {
    GET: 0,
    POST: 1,
    DELETE: 2
};

async function getHeaders(headers = null) {
    headers = headers || {};

    try {
        const value = await AsyncStorage.getItem(`${domainPrefix}.auth.lockchain`);
        if (value !== null) {
            headers.Authorization = value;
        }
    } catch (error) {
        console.log('Error getting headers:', error);
    }

    return headers;
}

async function sendRequest(endpoint, method, postObj = null, captchaToken = null, headers = { // eslint-disable-line
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Device-Version': '49365f68-42e1-11e8-842f-0ed5f89f718b'
}, onLogOut) {
    const allHeaders = getHeaders(headers);

    const getParams = {
        headers: {
            'Authorization': await AsyncStorage.getItem(`${domainPrefix}.auth.lockchain`),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'GET',
    };

    const postParams = {
        // headers: allHeaders,
        headers: {
            'Authorization': await AsyncStorage.getItem(`${domainPrefix}.auth.lockchain`),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Device-Version': '49365f68-42e1-11e8-842f-0ed5f89f718b'
          },
        method: 'POST',
        body: JSON.stringify(postObj)
    };

    const deleteParams = {
        headers: getHeaders(),
        method: 'DELETE'
    };

    let requestHeaders = {};

    switch (method) {
    case RequestMethod.GET:
        requestHeaders = getParams;
        break;
    case RequestMethod.POST:
        requestHeaders = postParams;
        break;
    case RequestMethod.DELETE:
        requestHeaders = deleteParams;
        break;
    default:
        break;
    }

    return fetch(endpoint, requestHeaders)
        .then((res) => {
            if (!res.ok) {
                return {
                    response: res.json().then((r) => {
                        console.log(res);
                        if (r.errors && r.errors.ExpiredJwt) {
                            AsyncStorage.multiRemove([`${domainPrefix}.auth.lockchain`, `${domainPrefix}.auth.username`]);
                            if (onLogOut) onLogOut();
                        }
                        return r;
                    }),
                    success: res.ok
                };
            }
            return {
                response: res,
                success: res.ok
            };
        });
}

export async function register(userObj, captchaToken) {
    // TODO: update backend to have it understand and process userWantsPromo correctly
    delete userObj.userWantsPromo;

    return sendRequest(`${host}users/signup`, RequestMethod.POST, userObj, captchaToken).then(res => res);
}

export async function login(userObj) {
    return sendRequest(`${host}login`, RequestMethod.POST, userObj).then(res => res);
}
export async function SaveCard(creditcardObj) {
    return sendRequest(`${host}SaveCard`, RequestMethod.POST, creditcardObj).then(res => res);
}
export async function getCurrencyRates() {
    return sendRequest(`${host}rates`, RequestMethod.GET).then(res => res.response.json());
}

export async function getLocRate() {
    return fetch('https://api.coinmarketcap.com/v1/ticker/lockchain/?convert=EUR').then(res => {
        return res.json();
    });
}

export async function getLocRateInUserSelectedCurrency(userSelectedCurrency) {
    return fetch(`https://api.coinmarketcap.com/v1/ticker/lockchain/?convert=${userSelectedCurrency}`).then(res => {
        return res.json();
    });
}

export function getTopHomes() {
    return sendRequest(`${host}listings/top`, RequestMethod.GET).then(res => res.response.json());
}

export async function getPropertyById(id) {
    return sendRequest(`${host}listings/${id}`, RequestMethod.GET).then(res => res.response.json());
}

export async function getRegionsBySearchParameter(param) {
    return sendRequest(`${host}regions/search?query=${param}`, RequestMethod.GET).then(res => {
        return res;
    });
}

export async function getCountriesWithListings() {
    return sendRequest(`${host}countries?hasListings=true&size=10000&sort=name,asc`).then(res => {
        return res;
    });
}

export async function getMyConversations(searchTerm) {
    return sendRequest(`${host}users/me/conversations${searchTerm !== null && searchTerm !== undefined ? `${searchTerm}&` : '?'}sort=id,desc`, RequestMethod.GET).then(res => {
        return res;
    });
}

export async function getUserInfo() {
    return sendRequest(`${host}users/me/info`, RequestMethod.GET).then(res => {
      return res;
    });
  }

export async function testBook(bookingObj) {
    return sendRequest(`${host}api/hotels/booking`, RequestMethod.POST, bookingObj).then(res => {
      return res;
    });
}

export async function getHotelById(id, search) {
    //return sendRequest(`https://staging.locktrip.com/api/api/hotels/32392?region=15664&currency=USD&startDate=25/05/2018&endDate=26/05/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D`, RequestMethod.GET).then(res => res);
    return sendRequest(`${host}api/hotels/${id}${search}`, RequestMethod.GET).then(res => res);
}

export async function getHotelRooms(id, search) {
    return sendRequest(`${host}api/hotels/${id}/rooms${search}`, RequestMethod.GET).then(res => res);
}

export async function getMyHotelBookings(searchTerm, size = 10) {
    return sendRequest(`${host}users/me/bookings${searchTerm !== null && searchTerm !== undefined ? `${searchTerm}&` : '?'}sort=id,desc&size=${size}`, RequestMethod.GET).then(res => res);
}

export async function getCancellationFees(bookingId) {
    return sendRequest(`${host}api/hotels/booking/${bookingId}/cancellationFee`, RequestMethod.GET).then(res => {
      return res;
    });
}
export async function getCurrentlyLoggedUserJsonFile() {
    return sendRequest(`${host}users/me/jsonFile`, RequestMethod.GET).then(res => {
        return res;
    });
}
