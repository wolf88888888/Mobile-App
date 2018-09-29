package com.locktrip;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;    //import package
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import co.airbitz.fastcrypto.RNFastCryptoPackage;

import com.dylanvann.fastimage.FastImageViewPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new RNCardViewPackage(),
          new MainReactPackage(),
          new ImageResizerPackage(),
          new RNUUIDGeneratorPackage(),
          new RCTSplashScreenPackage(),    //register Module
          new MapsPackage(),
          new ImagePickerPackage(),
          new FBSDKPackage(mCallbackManager),
          new RNFastCryptoPackage(),
          new StompPackage(),
          new FastImageViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
