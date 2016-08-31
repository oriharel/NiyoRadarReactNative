import {observable, action} from "mobx";
import {
    AsyncStorage
} from 'react-native';
import Dispatcher from './Dispatcher';
import {FRIENDS_KEY} from "./constants";


class Store {
    @observable loggedInUser = {};
    @observable friends = [];
    @observable selectedTab = 'map';
    @observable isFirstLoad = true;
    @observable mapRegionInput = {};

    constructor() {

    }

    @action
    setLoggedInUser(loggedInUser) {
        this.loggedInUser = loggedInUser;
    }

    @action
    setSelectedTab(selectedTab) {
        this.selectedTab = selectedTab;
    }

    @action
    setFirstLoad(isFirstLoad) {
        this.isFirstLoad = isFirstLoad;
    }

    @action
    setMapRegionInput(region) {
        this.mapRegionInput = region;
    }

    @action
    setFriends(friends) {
        this.friends = friends;
    }
}

const store = new Store();
Dispatcher.on('locationsUpdated', async ()=>{
    console.log('store received locationsUpdated');
    let friends = await AsyncStorage.getItem(FRIENDS_KEY);
    store.setFriends(JSON.parse(friends));
});
export default store;
