/**
 * Created by oriharel on 02/07/2016.
 */
import React, {Component} from 'react';
import {
    TabBarIOS,
    StyleSheet
} from 'react-native';
import MapComponent from "../components/MapComponent";
import FriendsList from '../components/FriendsList';
import Settings from '../containers/Settings';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component{


    render() {
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
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    wrapperImage: {
        flex: 1,
        height: 35,
        resizeMode: 'contain'
    },
    friendImage: {
        height: 22,
        resizeMode: 'contain',
        marginTop: -32
    }
});
