package com.locktrip;

import android.os.Handler;
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
import org.glassfish.tyrus.client.ClientProperties;
import org.glassfish.tyrus.client.SslContextConfigurator;
import org.glassfish.tyrus.client.SslEngineConfigurator;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;
import javax.websocket.ContainerProvider;
import javax.websocket.WebSocketContainer;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import org.springframework.messaging.simp.stomp.StompHeaders;

public class StompModule extends ReactContextBaseJavaModule {

    static ReactContext reactContext;
    int count;
    boolean _isErrorInvoked;
    StompSession _session;

    public StompModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "StompModule";
    }


    @ReactMethod
    public void startSession(String uid, String query, boolean isErrorInvoked,Callback success, Callback failure) throws NoSuchAlgorithmException {
        count = 0;
        _isErrorInvoked = isErrorInvoked;

        WebSocketContainer clientt = ContainerProvider.getWebSocketContainer();
        StandardWebSocketClient transport = new StandardWebSocketClient(clientt);
        WebSocketStompClient stompClient = new WebSocketStompClient(transport);

        stompClient.setAutoStartup(true);
        StringMessageConverter converter = new StringMessageConverter();
        stompClient.setMessageConverter(converter);
        String url = "wss://beta.locktrip.com/socket";

        stompClient.connect(url, new StompSessionHandler() {

            @Override
            public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
                _session = session;
                session.send("search","{\"uuid\":\""+uid+"\",\"query\":\""+query+"\"}");
                session.subscribe("search/"+uid, this);
            }

            @Override
            public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
                _session = session;
//                if (!_isErrorInvoked) {
//                    failure.invoke();
//                    _isErrorInvoked = true;
//                }
                //exception.printStackTrace();
                Log.e("error1", exception.getCause().toString());
            }

            @Override
            public void handleTransportError(StompSession session, Throwable exception) {
                _session = session;
                if (!_isErrorInvoked) {
                    failure.invoke();
                    _isErrorInvoked = true;
                    Log.e("Invoke","One");
                }
                else {
                    WritableMap event = Arguments.createMap();
                    event.putString("message","FAILED \n cannot retry socket.\nif we try to connect socket will try and connect from very start!");
                    emitDeviceEvent("ERROR_EVENT", event);
                }
                Log.e("error2", exception.getCause().toString());
            }

            @Override
            public Type getPayloadType(StompHeaders headers) {
                return String.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                Log.e("data",payload.toString());
                WritableMap event = Arguments.createMap();
                event.putString("message",payload.toString());
                emitDeviceEvent("SOCK_EVENT", event);
                if (count == 0 && !_isErrorInvoked){
                    success.invoke();
                    _isErrorInvoked = true;
                    Log.e("Invoke","two");
                }
                count ++;
            }
        });
    }

    @ReactMethod
    public void disconnect(){
        if (_session.isConnected()){
            _session.disconnect();
        }
    }

    private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData){
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }
}
