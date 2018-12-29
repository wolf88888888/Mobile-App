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
const UNSUBSCRIBE_SOCKET_METHOD = 'unsubscribe';

class WS {
    static self;
    constructor() {
        WS.self = this;
        this.ws = null;
        this.grouping = false;
        this.shoudSocketReconnect = true;
        this.initSocket();
        this.locAmounts = [];
    }

    initSocket() {
        this.ws = new WebSocket(socketHostPrice);
        this.ws.onmessage = this.handleRecieveMessage;
        this.ws.onopen = this.connect;
        this.ws.onclose = () => { 
            this.close(this); 
        };
    }

    startGrouping(scehduleTime = 20 * 1000){
        console.log("LOC PRICE startGrouping")
        this.grouping = true;
        if (this.timerOut !== undefined && this.timerOut !== null) {
            clearTimeout(this.timerOut);
            this.timerOut = null;
        }
        console.log("LOC PRICE stopGrouping setInterval");
        this.timer = setInterval(this.onTick, scehduleTime);
    }

    stopGrouping() {
        console.log("LOC PRICE stopGrouping");
        const that = this;
        clearInterval(that.timer);
        that.timer = null;
        this.timerOut = setTimeout(()=>{
            console.log("LOC PRICE stopGrouping timerOut");
            that.grouping = false;
            that.timerOut = null;
        }, 10 * 1000);
    }

    onTick() {
        let clonedLocAmounts = [...WS.self.locAmounts];
        WS.self.locAmounts = [];
        
        if (clonedLocAmounts.length > 0) {
            store.dispatch(updateLocAmounts(clonedLocAmounts));
        }
    }

    connect() {
        store.dispatch(setLocPriceWebsocketConnection(true));
    }

    sendMessage(id, method, params, isMarked = false) {
        console.log("WS - sendMessage", id, method, params, this.markedID);
        if (this.ws.readyState === 1 && id) {
            method = method ? method : DEFAULT_SOCKET_METHOD;
            if (isMarked) {
                if (method === DEFAULT_SOCKET_METHOD) {
                    this.markedID = id;
                }
                else if (method === UNSUBSCRIBE_SOCKET_METHOD){
                    this.markedID = null;
                }
            }
            if (!(method === UNSUBSCRIBE_SOCKET_METHOD && this.markedID === id)) {
                this.ws.send(JSON.stringify({ id, method, params }));
            }
        }
    }

    handleRecieveMessage(event) {
        if (event) {
            console.log("handleRecieveMessage", event.data, WS.self.grouping);
            const data = JSON.parse(event.data);
            if (data.params && data.params.secondsLeft) {
                const seconds = Math.round(data.params.secondsLeft / 1000);
                store.dispatch(setSeconds(seconds));
            }
            if (!WS.self.grouping) {
                store.dispatch(updateLocAmounts({fiatAmount: data.id, params: data.params, error: data.error}));
            }
            else {
                // console.log("handleRecieveMessage gropuing", WS.self.locAmounts);
                WS.self.locAmounts = [...WS.self.locAmounts, {fiatAmount: data.id, params: data.params, error: data.error}];
            }
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