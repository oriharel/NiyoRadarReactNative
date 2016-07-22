import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableHighlight
} from 'react-native';

import MapComponent from "./components/MapComponent";
import FriendsList from "./components/FriendsList";

var STORAGE_KEY = '@NIYORadar:friends';

export default class AppAndroid extends Component {


    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid style={styles.toolbar}
                                title={this.props.title}
                                navIcon={require('./images/ic_menu_black_24dp.png')}
                                actions={toolbarActions}
                                titleColor={'#000000'}/>
                <MapComponent style={styles.map} user={this.props.user}/>
            </View>
        );

    }

    _onActionSelected(position) {
        this.setState({
            actionText: 'Selected ' + toolbarActions[position].title,
        });
    }



}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        backgroundColor: '#bae572',
        height: 56,
    },
    map: {
        flex: 1
    }
});

var toolbarActions = [
    {title: 'Create', icon: require('./images/ic_menu_allfriends.png'), show: 'always'},
    {title: 'Settings'},
];