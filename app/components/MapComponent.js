import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';

import FriendPin from './FriendPin';
import Store from '../store';
import {observer} from "mobx-react/native";

@observer
export default class MapComponent extends Component{

    constructor(){
        super();
    }

    watchID: ?number = null;

    componentDidMount() {
        Store.setFirstLoad(true);
        this.watchID = navigator.geolocation.watchPosition((position) => {
            Store.setLocation({latitude: position.coords.latitude,
                longitude: position.coords.longitude});
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        console.log('rendering map with '+Store.friends.length+' friends');
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    onRegionChange={this._onRegionChange.bind(this)}
                    onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
                    region={{
                        latitude: Store.userLocation.latitude,
                        longitude: Store.userLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    initialRegion={{
                        latitude: Store.userLocation.latitude,
                        longitude: Store.userLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                >
                    {(() => {
                        if (Store.userLocation.latitude) {
                            return <MapView.Marker
                                coordinate={{latitude: Store.userLocation.latitude,
                                    longitude: Store.userLocation.longitude}}
                                title='You Are Here'
                                description='You Are Here desc'
                            >
                                <View style={styles.container}>
                                    <FriendPin friendImage={Store.loggedInUser.photo}/>
                                </View>
                            </MapView.Marker>
                        }

                    })()}

                    {Store.friends.map(friend => (
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
        Store.setMapRegionInput(region);
    }

    _onRegionChangeComplete(region) {
        if (Store.isFirstLoad) {
            Store.setMapRegionInput(region);
            Store.setFirstLoad(false);
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