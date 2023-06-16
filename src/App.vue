<template>
  <router-view />
</template>

<script setup>
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform, Notify } from 'quasar';
import { onMounted } from "vue";

onMounted(()=>{
  registerPushNotifications();
});

const registerPushNotifications = ()=>{

  // Do not implement this in web platform

  if(Platform.is.desktop){
    alertUser("Capacitor PushNotifications plugin is not implemented in web",'negative');
    return;
  }else{
    alertUser("Push notifications are registered properly!");
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
        alertUser('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error) => {
        alertUser('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification) => {
        alertUser('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification) => {
        alertUser('Push action performed: ' + JSON.stringify(notification));
      }
    );
}

const alertUser = (message, color = 'positive')=>{
  Notify.create({
        message: message,
        color: color, // The color of the notification (positive, negative, warning, info)
        timeout: 3000, // The duration in milliseconds before the notification disappears
        actions: [{ label: 'Dismiss', color: 'white' }] // Optional actions to show in the notification
      });
}
</script>
