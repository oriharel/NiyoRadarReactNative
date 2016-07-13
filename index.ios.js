/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  AsyncStorage
} from 'react-native';

import App from "./app/app";
import Login from "./app/containers/Login";

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {STORAGE_KEY, LOGGED_IN_USER_KEY} from "./app/constants";

class NiyoRadar extends Component {

  constructor(props) {
    console.log('constructor started');
    super(props);
    this.state = {
      user: null
    };

    let ori = {
      name: 'Ori Harel',
      email: 'ori.harel@gmail.com',
      photo: 'https://lh4.googleusercontent.com/-xGtdWuo4hi0/AAAAAAAAAAI/AAAAAAABCaw/WbaMsAoa8yI/photo.jpg'
    };

    let yifat = {
      name: 'Yifat Ferber-Harel',
      email: 'yifat.ferber@gmail.com',
      photo: 'https://lh4.googleusercontent.com/-xGtdWuo4hi0/AAAAAAAAAAI/AAAAAAABCaw/WbaMsAoa8yI/photo.jpg'
    };

    let users = [ori, yifat];

    console.log('setting '+JSON.stringify(users));
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  render() {
    return (
        <Navigator
            initialRoute={{id: 'first', user: this.state.user}}
            renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {

    if (!route.user) {
      return (<Login navigator={navigator}/>);
    }
    else {
      return (<App navigator={navigator} title="Map" user={route.user}/>);
    }

  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
          this.setState({user: null});
        })
        .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NiyoRadar', () => NiyoRadar);
