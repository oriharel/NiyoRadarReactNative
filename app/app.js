/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Navigator,
    Text,
    AsyncStorage,
    TouchableHighlight

} from 'react-native';

import MapComponent from "./components/MapComponent";
import ComManager from './comManager';
import Login from './containers/Login';
import {LOGGED_IN_USER_KEY} from "./constants";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class App extends Component {

    constructor(props) {
        super(props);
        ComManager.init();
    }

    async componentDidMount() {
        var loggedInUser = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
        if (loggedInUser) this.setState({loggedInUser: loggedInUser});
    }


    render() {
        console.log('App render started');
        return (
            <Navigator
                initialRoute={{id: 'map', user: this.state && this.state.user}}
                renderScene={this.navigatorRenderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.FloatFromBottom}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) =>
                            {
                                if (route.id !== 'map') {
                                    return (
                                        <TouchableHighlight onPress={() => navigator.pop()}>
                                            <Text>Back</Text>
                                        </TouchableHighlight>
                                    );
                                }
                            },
                            RightButton: (route, navigator, index, navState) =>
                            {
                                if (this.state && this.state.loggedInUser) {
                                    return (
                                        <TouchableHighlight style={styles.loginButton} onPress={() => navigator.push({id: 'friends'})}>
                                            <Icon size={25} name="users" color="#000000" />
                                        </TouchableHighlight>
                                    );
                                }
                                else {
                                    return (
                                        <TouchableHighlight style={styles.loginButton} onPress={() => navigator.push({id: 'login'})}>
                                            <Icon size={25} name="user" color="#000000" />
                                        </TouchableHighlight>
                                    );
                                }
                            },
                            Title: (route, navigator, index, navState) =>
                            {
                                if (route.id === 'map'){
                                    return (<Text style={styles.title}>Map</Text>);
                                }
                                else if (route.id === 'login'){
                                    return (<Text style={styles.title}>Login</Text>);
                                }

                            },
                        }}
                        style={styles.toolbar}
                    />
                }
            />
        );
    }

    navigatorRenderScene(route, navigator) {

        if (route.id === 'map') {
            return (<MapComponent navigator={navigator} title="NIYO Radar" user={route.user}/>);
        }
        else if (route.id === 'friends'){
            return (<FriendsList navigator={navigator}/>);
        }
        else if (route.id === 'login'){
            return (<Settings navigator={navigator}/>);
        }

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        backgroundColor: '#bae572'
    },
    loginButton: {
        marginRight: 20,
        marginTop: 5
    },
    title: {
        marginTop: 10
    }
});
