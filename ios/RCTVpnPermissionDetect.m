//
//  RCTVpnPermissionDetect.m
//  openSourceVpn
//
//  Created by salmon on 04.04.2023.
//
#import <Foundation/Foundation.h>

// RCTCalendarModule.m
#import "RCTVpnPermissionDetect.h"

@implementation RCTVpnPermissionDetect


RCT_EXPORT_METHOD(vpnPermissionCheck:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  [NETunnelProviderManager loadAllFromPreferencesWithCompletionHandler:^(
                                 NSArray<NETunnelProviderManager *> *_Nullable managers, NSError *_Nullable error) {
      /*if (error) {
        reject(@"E_PREPARE_ERRROR", @"Prepare VPN failed", error);
        return;
      }*/

      bool isPermissionAllowed = managers.firstObject ? true : false;
      resolve(@(isPermissionAllowed));
}];
  
  
  
  
  
  /*if (true) {
    resolve(@(true));
  } else {
    reject(@"event_failure", @"no event id returned", nil);
  }*/
}

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

@end
