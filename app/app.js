import React, {Component} from 'react';
import {
    Navigator,
    Text,
    View,
    NavigatorIOS,
    StyleSheet
} from 'react-native';

import MapComponent from "./components/MapComponent";


export default class MainView extends Component {

    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{title: this.props.user.name, component: MapComponent, user: this.props.user}}/>
                //renderScene={this.navigatorRenderScene}/>
        );

    }

    //navigatorRenderScene(route, navigator) {
    //    console.log('rendering a scene...');
    //    //_navigator = navigator;
    //    switch (route.id) {
    //        case 'first':
    //            return (<MapComponent navigator={navigator} title="MapComponent"/>);
    //    }
    //}

}

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