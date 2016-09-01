/**
 * Created by oriharel on 03/07/2016.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet
} from 'react-native';
import Store from '../store';
import {observer} from "mobx-react/native";

@observer
export default class FriendsList extends Component{

    constructor(){
        console.log('FriendsList constructor started');
        super();
        this.state = {
            friendsSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    componentDidMount() {
        console.log('[FriendsList] componentDidMount no of friends: '+ Store.friends.length);
        const items = Store.friends.slice();
        this.setState({
            friendsSource: this.state.friendsSource.cloneWithRows(items)
        })
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