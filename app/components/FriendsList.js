/**
 * Created by oriharel on 03/07/2016.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import Dispatcher from '../Dispatcher';
import {FRIENDS_KEY} from "../constants";

export default class FriendsList extends Component{

    constructor(){
        console.log('FriendsList constructor started');
        super();
        this.state = {
            friendsSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };

        Dispatcher.on('locationsUpdated', async () => {
            let friends = await AsyncStorage.getItem(FRIENDS_KEY);
            this.setState({
                friendsSource: this.state.friendsSource.cloneWithRows(JSON.parse(friends)),
            })
        })
    }

    async componentDidMount() {
        let friends = await AsyncStorage.getItem(FRIENDS_KEY);
        let numOfFriends = JSON.parse(friends) ? JSON.parse(friends).length : 0;
        console.log('[FriendsList] componentDidMount no of friends: '+ numOfFriends);

        if (numOfFriends > 0) {
            this.setState({
                friendsSource: this.state.friendsSource.cloneWithRows(JSON.parse(friends)),
            })
        }

    }


    render() {
        console.log('FriendsList render started');
        return (
            <ListView  contentContainerStyle={styles.list} initialListSize={20}
                       dataSource={this.state.friendsSource}
                       renderRow={this._renderRow.bind(this)}
                       enableEmptySections={true}
            />


        );
    }

    _renderRow(rowData) {

        return (
            <View>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.text}>
                            {rowData.name}
                        </Text>
                        <Text style={styles.text}>
                            {rowData.email}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    list: {
        paddingTop: 5
    },
    row: {
        paddingTop: 5
    },
    text: {
        flex: 1
    }
});