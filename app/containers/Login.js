/**
 * Created by oriharel on 13/07/2016.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {LOGGED_IN_USER_KEY} from "../constants";

export default class Login extends Component{

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
                // AsyncStorage.setItem(LOGGED_IN_USER_KEY, user);
                this.props.navigator.push({id: 'second', user: user})
            }).done();

        })
            .catch((err) => {
                console.log("Play services error", err.code, err.message);
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <GoogleSigninButton style={{width: 212, height: 48}}
                                    size={GoogleSigninButton.Size.Standard}
                                    color={GoogleSigninButton.Color.Light}
                                    onPress={this._signIn.bind(this)}
                />
            </View>
        );
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

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});