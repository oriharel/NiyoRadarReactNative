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


export default class App extends Component {

    constructor(props) {
        super(props);
        ComManager.init();
        LocationUpdater.update();
        this.state = {
            loggedInUser: {},
            selectedTab: 'map'
        }
    }

    async componentDidMount() {
        var loggedInUser = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
        if (loggedInUser) {
            this.setState({
                loggedInUser: JSON.parse(loggedInUser)
            })
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
                    selected={this.state.selectedTab === 'map'}
                    iconName='map'
                    onPress={() => {
                        this.setState({
                            selectedTab : 'map'
                        });
                    }}>
                    <MapComponent/>
                </Icon.TabBarItemIOS>
                {(() => {
                    if (this.state.loggedInUser) {
                        return <Icon.TabBarItemIOS
                            title='Friends'
                            selected={this.state.selectedTab === 'friends'}
                            iconName='users'
                            onPress={() => {
                                this.setState({
                                    selectedTab : 'friends'
                                });
                            }}>
                            <FriendsList/>
                        </Icon.TabBarItemIOS>
                    }

                })()}

                <Icon.TabBarItemIOS
                    title={this.state.loggedInUser ? 'Me' : 'Log In'}
                    style={styles.hidden}
                    selected={this.state.selectedTab === 'settings'}
                    iconName={this.state.loggedInUser ? 'cog' : 'user'}
                    onPress={() => {
                        this.setState({
                            selectedTab : 'settings'
                        });
                    }}>
                    <Settings loggedInUser={this.state.loggedInUser}/>
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
