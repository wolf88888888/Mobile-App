import { AsyncStorage } from 'react-native'

import { apiHost, basePath, routerPrefix, domainPrefix, WEB3_HTTP_PROVIDER, PUBLIC_URL } from '../config';

const host = apiHost;

const RequestMethod = {
  GET: 0,
  POST: 1,
  DELETE: 2
};

async function getHeaders(headers = null) {
  headers = headers || {};

  try {
    const value = await AsyncStorage.getItem(domainPrefix + '.auth.lockchain');
    if (value !== null){
      headers['Authorization'] = value;
    }
  } catch (error) {
    console.log('Error getting headers:', error)
  }

  return headers;
}

async function sendRequest(endpoint, method, postObj = null, captchaToken = null, headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Captcha': captchaToken
}, onLogOut) {
  let allHeaders = getHeaders(headers);

  let getParams = {
    headers: getHeaders()
  };

  let postParams = {
    headers: allHeaders,
    method: 'POST',
    body: JSON.stringify(postObj)
  };

  let deleteParams = {
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
  .then(res => {
    if (!res.ok) {
      return {
        response: res.json().then(r => {
          if (r.errors && r.errors['ExpiredJwt']) {
            AsyncStorage.multiRemove([domainPrefix + '.auth.lockchain', domainPrefix + '.auth.username']);
            if (onLogOut) onLogOut();
          }
          return r;
        }),
        success: res.ok
      };
    } else {
      return {
        response: res,
        success: res.ok
      };
    }
  });
}

export async function register(userObj, captchaToken) {
  return sendRequest(`${host}users/signup`, RequestMethod.POST, userObj, captchaToken).then(res => {
    return res;
  });
}

export async function login(userObj, captchaToken) {
  return sendRequest(`${host}login`, RequestMethod.POST, userObj, captchaToken, {}).then(res => {
    return res;
  });
}