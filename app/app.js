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
import {STORAGE_KEY} from "./constants";


export default class App extends Component {

    componentDidMount() {
        let friends = [
            {
                name: "Yifat Ferber - Harel",
                email: "yifat.ferber@gmail.com",
                location: {
                    latitude: 32.185377,
                    longitude: 34.890064
                },
                lastUpdate: 1112323123
            },
            {
                name: "Itamar Harel",
                email: "itamary.harel@gmail.com",
                location: {
                    latitude: 32.179184,
                    longitude: 34.893190
                },
                lastUpdate: 1112323123
            },
            {
                name: "Noa Harel",
                email: "noa.harel11@gmail.com",
                location: {
                    latitude: 32.183001,
                    longitude: 34.901410
                },
                lastUpdate: 1112323123
            }
        ];

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(friends));
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
                                if (route.id === 'map') {
                                    return null;
                                } else {
                                    return (
                                        <TouchableHighlight onPress={() => navigator.pop()}>
                                            <Text>Back</Text>
                                        </TouchableHighlight>
                                    );
                                }
                            },
                            RightButton: (route, navigator, index, navState) =>
                            {
                                if (route.id === 'map') {
                                    return (
                                        <TouchableHighlight onPress={() => navigator.push({id: 'friends'})}>
                                            <Text>Friends</Text>
                                        </TouchableHighlight>
                                    );
                                }
                            },
                            Title: (route, navigator, index, navState) =>
                            { return (<Text>Map</Text>); },
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
    }
});
