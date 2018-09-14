package com.example.user.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import org.glassfish.tyrus.client.ClientManager;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.ConnectionLostException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;

public class MainActivity extends AppCompatActivity {
    String _url = "wss://beta.locktrip.com/socket";
    WebSocketStompClient _client = null;
    StompSession _session = null;
    StompSession.Subscription _lastSubscription = null;

    boolean _isOnce = false;

    String _message = "";
    String _destination = "";

    StompSessionHandler _sessionHandler = new StompSessionHandler() {
        @Override
        public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
            Log.e("MainActivity", "Connected~~~~");
            _session = session;
            if (_isOnce) {
                MainActivity.this.getData();
            }
        }

        @Override
        public void handleException(StompSession session, StompCommand command, StompHeaders headers, byte[] payload, Throwable exception) {
            _session = null;
            Log.e("MainActivity", "handleException~~~~");
            exception.printStackTrace();
        }

        @Override
        public void handleTransportError(StompSession session, Throwable exception) {
            _session = null;
            Log.e("MainActivity", "handleTransportError~~~~");
            if (exception instanceof ConnectionLostException) {
                // if connection lost, call this
                _session.disconnect();
            }
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
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.btnConnect).setOnClickListener(view -> {
            _isOnce = false;
            new Thread(this::connect).start();
        });

        findViewById(R.id.btnGet).setOnClickListener(view -> {
            new Thread(this::getData).start();
        });

        findViewById(R.id.btnGet1).setOnClickListener(view -> {
            new Thread(this::getData1).start();
        });

        findViewById(R.id.btnUnsubscribe).setOnClickListener(view -> {
            new Thread(this::unSubscription).start();
        });

        findViewById(R.id.btnOnce).setOnClickListener(view -> {
            _isOnce = true;
            new Thread(this::connect).start();
        });
//        findViewById(R.id.btnSearch).setOnClickListener(v -> {
//            new Thread(() -> this.test()).start();
////            test();
//        });
//        new Thread(() -> this.test()).start();
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

    private void getData() {
        _message = "{\"uuid\":\"e38effa6-491f-4e9e-b3b4-e4a2f71ed835\",\"query\":\"?region=52612&currency=EUR&startDate=15/09/2018&endDate=16/09/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D\"}";
        _destination = "search/e38effa6-491f-4e9e-b3b4-e4a2f71ed835";

        this.subscription();
    }

    private void getData1() {
        _message = "{\"uuid\":\"7ad740e8-9dc3-4562-a98b-c9a121f43150&11386332418\",\"query\":\"?region=18417&currency=EUR&startDate=15/09/2018&endDate=16/09/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D\"}";
        _destination = "search/7ad740e8-9dc3-4562-a98b-c9a121f43150&11386332418";

        this.subscription();
    }

    private void test() {
        ClientManager client = ClientManager.createClient();
        WebSocketClient webSocketClient = new StandardWebSocketClient(client);

//        WebSocketClient webSocketClient = new StandardWebSocketClient();
        WebSocketStompClient stompClient = new WebSocketStompClient(webSocketClient);
        stompClient.setMessageConverter(new StringMessageConverter());

        String url = "wss://beta.locktrip.com/socket";
        StompHeaders stompHeaders = new StompHeaders();
        stompClient.connect(url, new WebSocketHttpHeaders(), stompHeaders, new StompSessionHandler() {
            @Override
            public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
                Log.e("MainActivity", "connected");
                session.send("search","{\"uuid\":\"e38effa6-491f-4e9e-b3b4-e4a2f71ed835\",\"query\":\"?region=52612&currency=EUR&startDate=14/09/2018&endDate=15/09/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D\"}");

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
