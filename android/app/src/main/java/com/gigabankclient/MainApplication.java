package com.gigabankclient;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.ninty.system.setting.SystemSettingPackage;
import com.oblador.shimmer.RNShimmerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.krazylabs.OpenAppSettingsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import java.util.Arrays;
import java.util.List;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.BV.LinearGradient.LinearGradientPackage;

//import com.oblador.vectoricons.VectorIconsPackage;

//public class MainApplication extends Application implements ReactApplication {
//
//  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//    @Override
//    public boolean getUseDeveloperSupport() {
//      return BuildConfig.DEBUG;
//    }
//
//    @Override
//    protected List<ReactPackage> getPackages() {
//      return Arrays.<ReactPackage>asList(
//          new MainReactPackage(),
//            new RCTToastPackage(),
//            new SystemSettingPackage(),
//            new RNShimmerPackage(),
//            new FastImageViewPackage(),
//            new OpenAppSettingsPackage(),
//            new VectorIconsPackage(),
//            new SvgPackage(),
//            new RNI18nPackage()
//      );
//    }
//
//    @Override
//    protected String getJSMainModuleName() {
//      return "index";
//    }
//  };
//
//  @Override
//  public ReactNativeHost getReactNativeHost() {
//    return mReactNativeHost;
//  }
//
//  @Override
//  public void onCreate() {
//    super.onCreate();
//    SoLoader.init(this, /* native exopackage */ false);
//  }
//}


public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new ReactNativeContacts(),
                new VectorIconsPackage(),
                new RNDeviceInfo(),
                new FastImageViewPackage(),
                new RNShimmerPackage(),
                new OpenAppSettingsPackage(),
                new SystemSettingPackage(),
                new RNI18nPackage(),
                new SvgPackage(),
                new RNCameraPackage(),
                new ReactNativeFingerprintScannerPackage(),
                new LinearGradientPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}

