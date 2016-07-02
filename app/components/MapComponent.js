import React, {Component} from 'react';
import {
    Text,
    View,
    MapView,
    Image,
    StyleSheet
} from 'react-native';

import FriendPin from './FriendPin';

export default class MapComponent extends React.Component{

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
            <MapView
                style={styles.container}
                onRegionChange={this._onRegionChange.bind(this)}
                onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
                region={this.state.mapRegion}
                annotations={this.state.annotations}
                showsUserLocation={true}
            />
        );
    }

    _getAnnotations(region) {
        return [{
            longitude: region.longitude,
            latitude: region.latitude,
            title: 'You Are Here',
            view: <View style={styles.container}>
                    <FriendPin friendImage={this.props.route.user.photo}/>
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
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});