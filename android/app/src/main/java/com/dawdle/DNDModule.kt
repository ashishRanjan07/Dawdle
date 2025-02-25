package com.dawdle

import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.Settings
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DNDModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val notificationManager: NotificationManager =
        reactContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

    override fun getName(): String {
        return "DNDManager"
    }

    @ReactMethod
    fun enableDND() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!notificationManager.isNotificationPolicyAccessGranted) {
                val intent = Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS)
                currentActivity?.startActivity(intent)
            } else {
                notificationManager.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_NONE)
            }
        }
    }

    @ReactMethod
    fun disableDND() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            notificationManager.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_ALL)
        }
    }
}
