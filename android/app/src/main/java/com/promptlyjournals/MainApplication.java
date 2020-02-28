package com.promptlyjournals;

import android.app.Application;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import tech.power.RNBraintreeDropIn.RNBraintreeDropInPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import cl.json.RNSharePackage;
import com.robertsheao.RNZenDeskSupport.RNZenDeskSupport;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.smixx.fabric.FabricPackage;
import com.dooboolab.RNIap.RNIapPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import io.codebakery.imagerotate.ImageRotatePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import io.fabric.sdk.android.Fabric;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
  private CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected CallbackManager getCallbackManager() {
        return mCallbackManager;
    }
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new RNBraintreeDropInPackage(),
            new RNSharePackage(),
            new RNZenDeskSupport(),
            new RNMixpanel(),
            new FabricPackage(),
            new RNIapPackage(),
            new PickerPackage(),
            new ReactNativePushNotificationPackage(),
            new ImageRotatePackage(),
            new FBSDKPackage(mCallbackManager),
            new VectorIconsPackage());
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
    /*Fabric.with(this, new Crashlytics());*/
    SoLoader.init(this, /* native exopackage */ false);
  }
}
