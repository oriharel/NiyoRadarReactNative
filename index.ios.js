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
  TouchableOpacity
} from 'react-native';

import App from "./app/app";
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

class NiyoRadar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
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
        console.log('USER', user);
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
