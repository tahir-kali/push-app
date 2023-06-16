<template>
  <router-view />
</template>

<script setup>
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform } from 'quasar';
import {onMounted} from "vue";

onMounted(()=>{
  registerPushNotifications();
});

const registerPushNotifications = ()=>{

  // Do not implement this in web platform

  if(Platform.is.desktop){
    console.log("Capacitor PushNotifications plugin is not implemented in web");
    return;
  }else{
    alert("Push notifications are registered properly!");
  }

  PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
}
</script>
