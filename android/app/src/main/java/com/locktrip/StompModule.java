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

    static ReactContext reactContext;
    int count;

    public StompModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "StompModule";
    }


    @ReactMethod
    public void startSession(String uid, String query, Callback success) {
        count = 0;
        ClientManager client = ClientManager.createClient();

        WebSocketClient transport = new StandardWebSocketClient(client);
        WebSocketStompClient stompClient = new WebSocketStompClient(transport);
        StringMessageConverter converter = new StringMessageConverter();
        stompClient.setMessageConverter(converter);
        String url = "wss://alpha.locktrip.com/socket";

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
//                WritableMap event = Arguments.createMap();
//                event.putString("message",payload.toString());
//                emitDeviceEvent("SOCK_EVENT", event);
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
