import { socketHostPrice } from '../config';
import {
    setLocPriceWebsocketConnection
} from '../redux/action/exchangerSocket';
import {
    updateLocAmounts,
    clearLocAmounts
} from '../redux/action/locAmounts'
import {
    setSeconds
} from '../redux/action/locPriceUpdateTimer'
import store from '../redux/store';
const WEBSOCKET_RECONNECT_DELAY = 5000;

const DEFAULT_SOCKET_METHOD = 'getLocPrice';

class WS {
    constructor() {
        this.ws = null;
        this.shoudSocketReconnect = true;
        this.initSocket();
    }

    initSocket() {
        this.ws = new WebSocket(socketHostPrice);
        this.ws.onmessage = this.handleRecieveMessage;
        this.ws.onopen = this.connect;
        this.ws.onclose = () => { 
            this.close(this); 
        };
    }

    connect() {
        store.dispatch(setLocPriceWebsocketConnection(true));
    }

    sendMessage(id, method, params) {
        console.log("WS - sendMessage", id, method, params);
        if (this.ws.readyState === 1 && id) {
            method = method ? method : DEFAULT_SOCKET_METHOD;
            this.ws.send(JSON.stringify({ id, method, params }));
        }
    }

    handleRecieveMessage(event) {
        if (event) {
            console.log("handleRecieveMessage", event.data);
            const data = JSON.parse(event.data);
            if (data.params && data.params.secondsLeft) {
                const seconds = Math.round(data.params.secondsLeft / 1000);
                store.dispatch(setSeconds(seconds));
            }
            store.dispatch(updateLocAmounts({fiatAmount: data.id, params: data.params, error: data.error}));
        }
    }

    close() {
        if (this.shoudSocketReconnect) {
            if (store.getState().currency.isLocPriceWebsocketConnected) {
                store.dispatch(clearLocAmounts());
                store.dispatch(setLocPriceWebsocketConnection(false));
            }
            setTimeout(() => {
                this.initSocket();
            }, WEBSOCKET_RECONNECT_DELAY);
        }
    }

    disconnect() {
        this.shoudSocketReconnect = false;
        if (this.ws) {
            this.ws.close();
        }
    }
}

export default WS;
export const WebsocketClient = new WS();