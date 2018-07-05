package com.baserythm.stomptest;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import nbouma.com.wstompclient.implementation.StompClient;
import nbouma.com.wstompclient.model.Frame;
import pk.aamir.stompj.internal.StompJSession;

public class MainActivity extends AppCompatActivity {

    private StompClient stompClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);



        stompClient = new StompClient("ws://159.89.8.109:61614") {
            @Override
            protected void onStompError(String errorMessage) {
                Log.e("Stomp",errorMessage);
            }

            @Override
            protected void onConnection(boolean connected) {
                Log.e("Stomp","isConnected: "+ connected);
            }

            @Override
            protected void onDisconnection(String reason) {
                Log.e("Stomp","Was disconnected because: "+reason);
            }

            @Override
            protected void onStompMessage(Frame frame) {
                Log.e("Stomp","Message");
            }
        };
    }
}
