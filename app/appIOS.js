import React, {Component} from 'react';
import {
    Navigator,
    Text,
    View,
    TabBarIOS,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import MapComponent from "./components/MapComponent";
import FriendsList from "./components/FriendsList";

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

var STORAGE_KEY = '@NIYORadar:friends';



export default class AppIOS extends Component {

    constructor(){
        super();
        this.state = {
            selectedTab: 'mapTab',
            friends: []
        };
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    async _loadInitialState() {
        console.log('_loadInitialState started');
        try {
            var friends = await AsyncStorage.getItem(STORAGE_KEY);
            if (friends !== null){
                console.log('found some friends');
                this.setState({friends: JSON.parse(friends)});
            } else {
                console.error('found NO friends');
            }
        } catch (error) {
            console.error('ERROR in _loadInitialState: '+error);
        }
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="yellow"
                tintColor="white"
                barTintColor="darkslateblue">
                <TabBarIOS.Item
                    title="Map"
                    icon={{uri: base64Icon, scale: 3}}
                    selected={this.state.selectedTab === 'mapTab'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'mapTab'
                        });
                      }}>
                    <MapComponent user={this.props.user}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('./resources/ic_menu_allfriends.png')}
                    selectedIcon={require('./resources/ic_menu_allfriends.png')}
                    renderAsOriginal
                    title="Friends"
                    selected={this.state.selectedTab === 'friendsTab'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'friendsTab'
                        });
                      }}>
                    <FriendsList friends={this.state.friends}/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );

    }



}

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});