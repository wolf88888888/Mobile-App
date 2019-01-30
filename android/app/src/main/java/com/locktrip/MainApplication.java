package com.locktrip;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.airbnb.android.react.maps.MapsPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.CallbackManager;
import co.airbitz.fastcrypto.RNFastCryptoPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

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
        new MainReactPackage(),
            new RNGestureHandlerPackage(),
        new VectorIconsPackage(),
        new StompPackage(),
        new RNUUIDGeneratorPackage(),
        new RCTSplashScreenPackage(),
        new MapsPackage(),
        new ImageResizerPackage(),
        new ImagePickerPackage(),

        new RNFastCryptoPackage(),
        new FBSDKPackage(mCallbackManager),
        new FastImageViewPackage(),
        new RNCardViewPackage()
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
