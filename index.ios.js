/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    AsyncStorage
} from 'react-native';

import App from "./app/app.ios";
import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications';
import BackgroundGeolocation from "react-native-background-geolocation";
import {LOGGED_IN_USER_KEY, API_URL} from "./app/constants";


class NiyoRadar extends Component {

  constructor() {
    super();
    NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    NotificationsIOS.requestPermissions();
    this.initiateBackgroundLocationUpdate();
  }

  async initiateBackgroundLocationUpdate() {

    BackgroundGeolocation.configure({
      useSignificantChangesOnly: true
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', async function(location) {
      console.log('- [js]location: ', JSON.stringify(location));
      var loggedInUserStr = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);

      if (loggedInUserStr) {
        var loggedInUser = JSON.parse(loggedInUserStr);
        fetch(API_URL+'/updateLocation', {
          method: 'POST',
          body: JSON.stringify({
            location: location,
            user: loggedInUser.email
          })
        })
      }

    });

    // This handler fires whenever bgGeo receives an error
    BackgroundGeolocation.on('error', function(error) {
      var type = error.type;
      var code = error.code;
      alert(type + " Error: " + code);
    });

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', function(location) {
      console.log('- [js]motionchanged: ', JSON.stringify(location));
    });

    // This event fires when a chnage in motion activity is detected
    BackgroundGeolocation.on('activitychange', function(activityName) {
      console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
    });

    // This event fires when the user toggles location-services
    BackgroundGeolocation.on('providerchange', function(provider) {
      console.log('- Location provider changed: ', provider.enabled);
    });

  }

  onPushRegistered(deviceToken) {
    console.log("Device Token Received: " + deviceToken);
  }

  onNotificationReceivedForeground(notification) {
    console.log("Notification Received Foreground: " + JSON.stringify(notification));
  }

  onNotificationReceivedBackground(notification) {
    NotificationsIOS.log("Notification Received Background: " + JSON.stringify(notification));

    NotificationsIOS.localNotification({
      alertBody: "Received background notificiation!",
      alertTitle: "Local Notification Title",
      alertAction: "Click here to open",
      soundName: "chime.aiff",
      category: "SOME_CATEGORY",
      userInfo: notification.getData()
    });

    NotificationsIOS.backgroundTimeRemaining(time => NotificationsIOS.log("remaining background time: " + time));
  }


  render() {
    return (
        <App/>
    );
  }

  componentWillUnmount() {
    NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
    NotificationsIOS.resetCategories();
  }
}

AppRegistry.registerComponent('NiyoRadar', () => NiyoRadar);
