import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    AsyncStorage,
    TouchableHighlight
} from 'react-native';

import MapComponent from "./components/MapComponent";
import FriendsList from "./components/FriendsList";

var STORAGE_KEY = '@NIYORadar:friends';

export default class AppAndroid extends Component {

    constructor(){
        super();
    }




    render() {
        return (
            <View style={styles.container}>
                <MapComponent style={styles.map} user={this.props.user}/>
            </View>
        );

    }

    _onActionSelected(position) {
        if (position === 0) {
            this.props.navigator.push({id: 'friends', user: this.props.user});
        }
    }



}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    }
});

var toolbarActions = [
    {title: 'Friends', icon: require('./images/ic_menu_allfriends.png'), show: 'always'},
    {title: 'Settings'},
];