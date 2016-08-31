/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    TabBarIOS,
    AsyncStorage,

} from 'react-native';

import MapComponent from "./components/MapComponent";
import ComManager from './comManager';
import LocationUpdater from './locationUpdater';
import Settings from './containers/Settings';
import FriendsList from './components/FriendsList';
import {LOGGED_IN_USER_KEY} from "./constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import Store from './store';
import {observer} from "mobx-react/native";

@observer
export default class App extends Component {

    constructor(props) {
        super(props);
        ComManager.init();
        LocationUpdater.update();
    }

    async componentDidMount() {
        var loggedInUser = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
        if (loggedInUser) {
            // console.log('found logged in user '+loggedInUser);
            Store.setLoggedInUser(JSON.parse(loggedInUser));
        }
        else {
            console.log('[app] no logged in user');
        }
    }


    render() {
        console.log('App render started');
        return (
            <TabBarIOS
                unselectedTintColor="gray"
                tintColor="black"
                barTintColor="#bae572">
                <Icon.TabBarItemIOS
                    title="Map"
                    selected={Store.selectedTab === 'map'}
                    iconName='map'
                    onPress={() => {
                        Store.setSelectedTab('map');
                    }}>
                    <MapComponent/>
                </Icon.TabBarItemIOS>
                {(() => {
                    if (Store.loggedInUser) {
                        return <Icon.TabBarItemIOS
                            title='Friends'
                            selected={Store.selectedTab === 'friends'}
                            iconName='users'
                            onPress={() => {
                                Store.setSelectedTab('friends');
                            }}>
                            <FriendsList/>
                        </Icon.TabBarItemIOS>
                    }

                })()}

                <Icon.TabBarItemIOS
                    title={Store.loggedInUser ? 'Me' : 'Log In'}
                    style={styles.hidden}
                    selected={Store.selectedTab === 'settings'}
                    iconName={Store.loggedInUser ? 'cog' : 'user'}
                    onPress={() => {
                        Store.setSelectedTab('settings');
                    }}>
                    <Settings/>
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
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
