/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import App from "./app/app";
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
var STORAGE_KEY = '@NIYORadar:friends';

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

  componentDidMount() {
    console.log('componentDidMount started...');
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {

      console.log('configuring GoogleSignin...');
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        iosClientId: '586622831086-dte1gna5enr7dcfj0g4lkf6feh6h591t.apps.googleusercontent.com',
        webClientId: '586622831086-uhmb85chi2i8jvnbqpqpnm80jqchelm0.apps.googleusercontent.com',
        offlineAccess: false
      });

      console.log('figuring out current user...');
      GoogleSignin.currentUserAsync().then((user) => {
        this.setState({user: user});
      }).done();

    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    })
  }



  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton style={{width: 212, height: 48}} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Light} onPress={this._signIn.bind(this)}/>
        </View>
      );
    }

    if (this.state.user) {
      return (
          <App user={this.state.user}/>
      );
    }

  }

  _signIn() {
    console.log('_signIn started...');
    try {
      GoogleSignin.signIn()
          .then((user) => {
            console.log(user);
            this.setState({user: user});
          })
          .catch((err) => {
            console.log('WRONG SIGNIN', err);
          })
          .done();
    }
    catch (ex) {
      console.error('Error trying to GoogleSignin.signIn() '+ex);
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
