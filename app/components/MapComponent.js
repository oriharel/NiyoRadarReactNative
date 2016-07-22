import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';

import FriendPin from './FriendPin';

export default class MapComponent extends Component{

    constructor(){
        super();
        this.state = {
            isFirstLoad: true,
            mapRegion: undefined,
            mapRegionInput: undefined,
            annotations: []
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    onRegionChange={this._onRegionChange.bind(this)}
                    onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
                    region={this.state.mapRegion}
                    annotations={this.state.annotations}
                    showsUserLocation={true}
                />
            </View>
        );
    }

    _getAnnotations(region) {
        return [{
            longitude: region.longitude,
            latitude: region.latitude,
            title: 'You Are Here',
            view: <View style={styles.container}>
                    <FriendPin friendImage={this.props.user.photo}/>
                  </View>
        }];
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
                annotations: this._getAnnotations(region),
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
    }
});