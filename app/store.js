import {observable, action} from "mobx";


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
}
export default Store;
