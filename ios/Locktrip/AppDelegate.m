/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTSplashScreen.h" //import interface
#import <FBSDKCoreKit/FBSDKCoreKit.h>
@import GoogleMaps;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Locktrip"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  [GMSServices provideAPIKey:@"AIzaSyDqHNX83ZkYeqikdpHP4QKpOVbKAX4Vtts"];
  //[RCTSplashScreen open:rootView];
  [RCTSplashScreen open:rootView withImageNamed:@"splash"]; // activate splashscreen, imagename from LaunchScreen.xib
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:0.85 green:0.48 blue:0.38 alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                  ];
  // Add any custom logic here.
  return handled;
}
@end
