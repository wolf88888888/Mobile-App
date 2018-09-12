package com.example.user.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import org.glassfish.tyrus.client.ClientManager;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btnSearch).setOnClickListener(v -> {
            new Thread(() -> this.test()).start();
//            test();
        });
        new Thread(() -> this.test()).start();
    }

    private void test() {
        ClientManager client = ClientManager.createClient();
        WebSocketClient webSocketClient = new StandardWebSocketClient(client);

//        WebSocketClient webSocketClient = new StandardWebSocketClient();
        WebSocketStompClient stompClient = new WebSocketStompClient(webSocketClient);
        stompClient.setMessageConverter(new StringMessageConverter());

//        StompSessionHandler handler = new TestStompSessionHandler(this);

//        stompClient.connect(url, new WebSocketHttpHeaders(), stompHeaders, handler);

        String url = "wss://beta.locktrip.com/socket";
        StompHeaders stompHeaders = new StompHeaders();
        stompClient.connect(url, new WebSocketHttpHeaders(), stompHeaders, new StompSessionHandler() {
            @Override
            public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
                session.send("search","{\"uuid\":\"e38effa6-491f-4e9e-b3b4-e4a2f71ed835\",\"query\":\"?region=15664&currency=EUR&startDate=12/09/2018&endDate=13/09/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D\"}");

                session.subscribe("search/e38effa6-491f-4e9e-b3b4-e4a2f71ed835", this);
            }

            @Override
            public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
                exception.printStackTrace();
            }

            @Override
            public void handleTransportError(StompSession session, Throwable exception) {
                exception.printStackTrace();
            }

            @Override
            public Type getPayloadType(StompHeaders headers) {
                return String.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                Log.e("MainActivity", payload.toString());
            }
        });
    }
}
