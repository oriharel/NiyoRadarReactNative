import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';

import FriendPin from './FriendPin';
import locationUpdater from '../locationUpdater';

import {STORAGE_KEY, LOGGED_IN_USER_KEY} from "../constants";

export default class MapComponent extends Component{

    constructor(){
        super();
        this.state = {
            user: {},
            friends: []
        };
    }

    componentDidMount() {
        this.setState({isFirstLoad: true});
        this._loadInitialState().done();
    }

    async _loadInitialState() {
        console.log('_loadInitialState started');
        try {

            var user = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
            console.log('user is: '+user);
            if (user) {
                this.setState({user: JSON.parse(user)});
            }

            let friends = await AsyncStorage.getItem(STORAGE_KEY) || "[]";
            var friendsObj = JSON.parse(friends);
            console.log('You have '+friendsObj.length+' friends');

            this.setState({friends: JSON.parse(friends)});

            this.updateFriends();


        } catch (error) {
            console.error('ERROR in _loadInitialState: '+error);
        }
    }

    updateFriends() {
        locationUpdater.update(this.state.friends, (updatedFriends)=>{
            this.setState(updatedFriends);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    onRegionChange={this._onRegionChange.bind(this)}
                    onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
                    initialRegion={{
                        latitude: 32.187824,
                        longitude: 34.896701,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                >

                    <MapView.Marker
                        coordinate={{latitude: 32.182586, longitude: 34.895063}}
                        title='You Are Here'
                        description='You Are Here desc'
                    >
                        <View style={styles.container}>
                            <FriendPin friendImage={this.state.user.photo}/>
                        </View>
                    </MapView.Marker>

                    {this.state.friends.map(friend => (
                        <MapView.Marker
                            coordinate={friend.location}
                            title={friend.name}
                            description={friend.email}
                            key={friend.email}
                        >
                            <View style={styles.container}>
                                <FriendPin friendImage={friend.photo}/>
                            </View>
                        </MapView.Marker>
                    ))}

                </MapView>
            </View>
        );
    }

    _onRegionChange(region) {
        this.setState({
            mapRegionInput: region
        });
    }

    _onRegionChangeComplete(region) {
        if (this.state.isFirstLoad) {
            this.setState({
                mapRegionInput: region,
                isFirstLoad: false
            });
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    wrapperImage: {
        flex: 1,
        height: 65
    }
});