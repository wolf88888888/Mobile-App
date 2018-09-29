package ua.naiksoftware.stompclientexample;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import io.reactivex.CompletableTransformer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;
import ua.naiksoftware.stomp.Stomp;
import ua.naiksoftware.stomp.client.StompClient;

import static ua.naiksoftware.stompclientexample.RestClient.ANDROID_EMULATOR_LOCALHOST;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    private SimpleAdapter mAdapter;
    private List<String> mDataSet = new ArrayList<>();
    private StompClient mStompClient;
    private Disposable mRestPingDisposable;
    private final SimpleDateFormat mTimeFormat = new SimpleDateFormat("HH:mm:ss", Locale.getDefault());
    private RecyclerView mRecyclerView;
    private Gson mGson = new GsonBuilder().create();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mRecyclerView = (RecyclerView) findViewById(R.id.recycler_view);
        mAdapter = new SimpleAdapter(mDataSet);
        mAdapter.setHasStableIds(true);
        mRecyclerView.setAdapter(mAdapter);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, true));
    }

    public void disconnectStomp(View view) {
        mStompClient.disconnect();
    }

    @SuppressLint("CheckResult")
    public void connectStomp(View view) {
//        mStompClient = Stomp.over(Stomp.ConnectionProvider.JWS, "ws://" + ANDROID_EMULATOR_LOCALHOST
//                + ":" + RestClient.SERVER_PORT + "/example-endpoint/websocket");

        mStompClient = Stomp.over(Stomp.ConnectionProvider.JWS, "wss://beta.locktrip.com/socket");

        mStompClient.lifecycle()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(lifecycleEvent -> {
                    switch (lifecycleEvent.getType()) {
                        case OPENED:
                            Log.e(TAG, "Stomp connection opened");
                            toast("Stomp connection opened");
                            break;
                        case ERROR:
                            Log.e(TAG, "Stomp connection error", lifecycleEvent.getException());
                            toast("Stomp connection error");
                            break;
                        case CLOSED:
                            Log.e(TAG, "Stomp connection closed");
                            toast("Stomp connection closed");
                    }
                });

//        // Receive greetings
        mStompClient.topic("search/93fa27ac-36e0-4084-b2c2-b6afd0fba938")
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(topicMessage -> {
                    Log.e(TAG, topicMessage.toString());
                    Log.e(TAG, "Received " + topicMessage.getPayload());
                    addItem(mGson.fromJson(topicMessage.getPayload(), EchoModel.class));
                });

        mStompClient.connect();
    }

    @SuppressLint("CheckResult")
    public void sendEchoViaStomp(View v) {
        mStompClient.send("search/e38effa6-491f-4e9e-b3b4-e4a2f71ed835",
                "{\"uuid\":\"e38effa6-491f-4e9e-b3b4-e4a2f71ed835\",\"query\":\"?region=15664&currency=EUR&startDate=12/09/2018&endDate=13/09/2018&rooms=%5B%7B%22adults%22:2,%22children%22:%5B%5D%7D%5D\"}")
                .compose(applySchedulers())
                .subscribe(() -> {
                    Log.d(TAG, "STOMP echo send successfully");
                }, throwable -> {
                    Log.e(TAG, "Error send STOMP echo", throwable);
                    toast(throwable.getMessage());
                });
    }

    public void sendEchoViaRest(View v) {
        mRestPingDisposable = RestClient.getInstance().getExampleRepository()
                .sendRestEcho("Echo REST " + mTimeFormat.format(new Date()))
                .compose(applySchedulers())
                .subscribe(() -> {
                    Log.e(TAG, "REST echo send successfully");
                }, throwable -> {
                    Log.e(TAG, "Error send REST echo", throwable);
                    toast(throwable.getMessage());
                });
    }

    private void addItem(EchoModel echoModel) {
        mDataSet.add(echoModel.getEcho() + " - " + mTimeFormat.format(new Date()));
        mAdapter.notifyDataSetChanged();
        mRecyclerView.smoothScrollToPosition(mDataSet.size() - 1);
    }

    private void toast(String text) {
        Log.i(TAG, text);
        Toast.makeText(this, text, Toast.LENGTH_SHORT).show();
    }

    protected CompletableTransformer applySchedulers() {
        return upstream -> upstream
                .unsubscribeOn(Schedulers.newThread())
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread());
    }

    @Override
    protected void onDestroy() {
        mStompClient.disconnect();
        if (mRestPingDisposable != null) mRestPingDisposable.dispose();
        super.onDestroy();
    }
}
