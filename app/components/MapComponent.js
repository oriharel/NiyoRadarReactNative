import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

import MapView from 'react-native-maps';
import Dispatcher from '../Dispatcher';
import FriendPin from './FriendPin';
import {FRIENDS_KEY} from "../constants";

export default class MapComponent extends Component{

    constructor(){
        super();
        this.state = {
            userLocation: {
                latitude: 0,
                longitude: 0
            },
            mapRegionInput:{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            loggedInUser: {},
            friends: []
        };

        Dispatcher.on('locationsUpdated', async () => {
            let friends = await AsyncStorage.getItem(FRIENDS_KEY);
            this.setState({
                friends: JSON.parse(friends)
            })
        })
    }

    watchID: ?number = null;

    componentDidMount() {
        this.setState({firstLoad: true});
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // console.log('received position change...');
            this.setState({
                userLocation: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                mapRegionInput:{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }});
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        // console.log('rendering map with '+this.state.friends.length+' friends');
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    ref={ref => { this.map = ref; }}
                    onRegionChange={this._onRegionChange.bind(this)}
                    onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
                    region={this.state.mapRegionInput}
                    initialRegion={{
                        latitude: this.state.userLocation.latitude,
                        longitude: this.state.userLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                >
                    {(() => {
                        if (this.state.userLocation.latitude) {
                            return <MapView.Marker
                                coordinate={{latitude: this.state.userLocation.latitude,
                                    longitude: this.state.userLocation.longitude}}
                                title='You Are Here'
                                description='You Are Here desc'
                            >
                                <View style={styles.container}>
                                    <FriendPin friendImage={this.state.loggedInUser.photo}/>
                                </View>
                            </MapView.Marker>
                        }

                    })()}

                    {this.state.friends.map(friend => (
                        <MapView.Marker
                            coordinate={friend.location}
                            title={friend.name}
                            description={friend.email}
                            key={friend.email}
                            onPress={() => {this.setState({selectedFriend: friend})}}
                        >
                            <View style={styles.container}>
                                <FriendPin friendImage={friend.photo}/>
                            </View>
                        </MapView.Marker>
                    ))}

                </MapView>
                {this.renderArrowButton('leftArrow', '\u2190')}
                {this.renderArrowButton('rightArrow', '\u2192')}
            </View>
        );
    }

    renderArrowButton(arrow, innerText) {

        if (this.state.selectedFriend) {
            return (
                <TouchableOpacity
                    style={styles[arrow]}
                    onPress={() => this.focusOnNextFriend()}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{innerText}</Text>
                </TouchableOpacity>
            );
        }
    }

    focusOnNextFriend() {

        let nextFriend = this.calculateNextFriend();
        console.log('next friend is '+nextFriend.email);
        this.map.animateToRegion({
            latitude: nextFriend.location.latitude,
            longitude: nextFriend.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
    }

    calculateNextFriend() {
        if (!this.state.selectedFriend) return this.state.friends[0];
        let selectedFriendIndex = this.state.friends.indexOf(this.state.selectedFriend);
        let f1 = this.state.friends.slice(selectedFriendIndex+1);

        return f1.length ? f1[0] : this.state.friends[0];
    }

    _onRegionChange(region) {
        // this.setState({mapRegionInput: region});
    }

    _onRegionChangeComplete(region) {
        // if (this.state.isFirstLoad) {
            this.setState({
                mapRegionInput: region,
                selectedFriend: this.calculateNextFriend(),
                isFirstLoad: false
            });
        // }
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
    },
    leftArrow: {
        position: 'absolute',
        bottom: 60,
        left: 12,
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: 12,
        borderRadius: 20,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightArrow: {
        position: 'absolute',
        bottom: 60,
        right: 12,
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: 12,
        borderRadius: 20,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    }

});