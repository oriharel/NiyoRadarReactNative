/**
 * Created by oriharel on 13/07/2016.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    AsyncStorage
} from 'react-native';

import {LOGGED_IN_USER_KEY} from "../constants";
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class Login extends Component{

    componentDidMount() {
        this._setupGoogleSignin();
    }

    render() {
        return (
            <View style={styles.container}>
                <GoogleSigninButton style={{width: 212, height: 48}}
                                    size={GoogleSigninButton.Size.Standard}
                                    color={GoogleSigninButton.Color.Light}
                                    onPress={this._signIn.bind(this)}/>
            </View>
        );
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
                iosClientId: '278933542632-mk50fsu3928q5et5i5jq5b1gkrj00siq.apps.googleusercontent.com',
                webClientId: '278933542632-6q56ev6qkd6160kag7s60qj2k9onjnd2.apps.googleusercontent.com',
                offlineAccess: false
            });

            const user = await GoogleSignin.currentUserAsync();
            console.log(user);
            this.setState({user});
        }
        catch(err) {
            console.log("Google signin error", err.code, err.message);
        }
    }

    _signIn() {
        GoogleSignin.signIn()
            .then(async (user) => {
                console.log(user);
                this.setState({user: user});
                await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
                this.props.navigator.pop();
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
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
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});