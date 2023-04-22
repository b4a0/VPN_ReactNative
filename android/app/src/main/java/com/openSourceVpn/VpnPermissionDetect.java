package free.vpn.unblock.proxy.opensource; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import static android.app.Activity.RESULT_OK;
import android.app.Activity;
import android.content.Intent;
import android.net.VpnService;
import com.facebook.react.bridge.Promise;

public class VpnPermissionDetect extends ReactContextBaseJavaModule {
   VpnPermissionDetect(ReactApplicationContext context) {
       super(context);
   }

   @Override
    public String getName() {
        return "VpnPermissionDetect";
    }
    @ReactMethod
    public void vpnPermissionCheck(Promise promise) {
        try {
            Activity currentActivity = getCurrentActivity();
            Intent intent = VpnService.prepare(currentActivity);
            if (intent != null) {
                promise.resolve(false);
            }else{
                promise.resolve(true);
            }
        } catch(Exception e) {
            promise.reject("Error: ", e);
        }
    }
}