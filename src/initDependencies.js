import { apiHost, domainPrefix, xDeviceVersion } from './config';

import { AsyncStorage } from 'react-native';
import Requester from 'locktrip-service-layer';

let config = {
    "apiHost": apiHost,
    "domainPrefix": domainPrefix
};

let requester = new Requester(AsyncStorage, config, { "X-Device-Version": xDeviceVersion });

export default requester;
