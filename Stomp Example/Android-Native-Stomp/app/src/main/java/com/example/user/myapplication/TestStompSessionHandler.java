package com.example.user.myapplication;


import android.app.Activity;
import android.widget.Toast;

import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import java.lang.reflect.Type;

public class TestStompSessionHandler implements StompSessionHandler {

    private final Activity activity;

    public TestStompSessionHandler(Activity activity) {
        this.activity = activity;
    }

    @Override
    public Type getPayloadType(StompHeaders headers) {
        return String.class;
    }

    @Override
    public void handleFrame(StompHeaders headers, Object payload) {
        activity.runOnUiThread(() -> Toast.makeText(activity, payload.toString(), Toast.LENGTH_LONG).show());
        System.out.println("WORKING");
    }


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


}
