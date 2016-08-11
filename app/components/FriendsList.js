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

export default class FriendsList extends Component{

    constructor(){
        console.log('FriendsList constructor started');
        super();
        this.state = {
            friendsSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    componentDidMount() {
        console.log('[FriendsList] componentDidMount no of friends: '+ this.props.friends.length);
        this.setState({
            friendsSource: this.state.friendsSource.cloneWithRows(this.props.friends)
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