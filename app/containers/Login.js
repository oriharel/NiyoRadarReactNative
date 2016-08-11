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

export default class Login extends Component{

    componentDidMount() {
        console.log('[Login] componentDidMount started...');
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value="Login"
                />
            </View>
        );
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