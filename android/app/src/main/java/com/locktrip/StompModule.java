package com.locktrip;

import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.glassfish.tyrus.client.ClientManager;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import org.springframework.messaging.simp.stomp.StompHeaders;

public class StompModule extends ReactContextBaseJavaModule {

    static final String _url = "wss://beta.locktrip.com/socket";
    private Context context;
    private WebSocketStompClient _client = null;
    StompSession _session = null;
    StompSession.Subscription _lastSubscription = null;

    public StompModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = context;
    }

    @Override
    public String getName() {
        return "StompModule";
    }

    public WebSocketStompClient client() {
        if (_client != null)
            return _client;
        ClientManager clientManager = ClientManager.createClient();
        WebSocketClient webSocketClient = new StandardWebSocketClient(clientManager);

        ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.afterPropertiesSet();
        WebSocketStompClient stompClient = new WebSocketStompClient(webSocketClient);
        stompClient.setMessageConverter(new StringMessageConverter());
        stompClient.setTaskScheduler(taskScheduler);
        stompClient.setReceiptTimeLimit(5000);
        return stompClient;
    }

    private void connect() {
        _client = this.client();
        if (!_client.isRunning() || _session == null || !_session.isConnected()) {
            StompHeaders stompHeaders = new StompHeaders();
            _client.connect(_url, new WebSocketHttpHeaders(), stompHeaders, _sessionHandler);
        }
    }

    private void disconnect() {
        unSubscription();
        if (_session != null) {
            _session.disconnect();
            _session = null;
        }
    }

    private void unSubscription() {
        if (_lastSubscription != null) {
            _lastSubscription.unsubscribe();
            _lastSubscription = null;
        }
    }

    private void subscription() {
        if (_session != null && _session.isConnected()) {
            this.unSubscription();

            _session.send("search",_message);
            _lastSubscription = _session.subscribe(_destination, _sessionHandler);
        }
        else {
            _isOnce = true;
            connect();
        }
    }

    @ReactMethod
    public void connect(Callback ){

    }

    @ReactMethod
    public void startSession(String uid, String query, Callback success) {
        count = 0;
        ClientManager client = ClientManager.createClient();

        WebSocketClient transport = new StandardWebSocketClient(client);
        WebSocketStompClient stompClient = new WebSocketStompClient(transport);
        StringMessageConverter converter = new StringMessageConverter();
        stompClient.setMessageConverter(converter);

        stompClient.connect(url, new StompSessionHandler() {

            @Override
            public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
                session.send("search","{\"uuid\":\""+uid+"\",\"query\":\""+query+"\"}");
                session.subscribe("search/"+uid, this);
            }

            @Override
            public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {

            }

            @Override
            public void handleTransportError(StompSession session, Throwable exception) {

            }

            @Override
            public Type getPayloadType(StompHeaders headers) {
                return String.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                WritableMap event = Arguments.createMap();
                event.putString("message",payload.toString());
                emitDeviceEvent("SOCK_EVENT", event);
                if (count == 0){
                    success.invoke();
                }
                count ++;
            }
        });
    }

    private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData){
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }
}
