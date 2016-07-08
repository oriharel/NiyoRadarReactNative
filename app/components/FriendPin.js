/**
 * Created by oriharel on 02/07/2016.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

export default class FriendPin extends Component{

    constructor(){
        super();
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.wrapperImage}
                    source={require('../resources/friend_placard.png')}
                />
                <Image
                    style={styles.friendImage}
                    source={{uri:this.props.friendImage}}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapperImage: {
        height: 35,
        resizeMode: 'contain'
    },
    friendImage: {
        height: 22,
        resizeMode: 'contain',
        marginTop: -32
    }
});
