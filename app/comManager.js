import './UserAgent';
import io from 'socket.io-client/socket.io';
import logger from './Logger';
import {LOGGED_IN_USER_KEY, FRIENDS_KEY} from "./constants";
import Dispatcher from './Dispatcher';

var socket;

import {
    AsyncStorage
} from 'react-native';

async function sendGetFriendsReq() {

    try {
        var user = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);

        if (user) {
            logger.debug('found logged in user. emitting getFriends to server');
            socket.emit('getFriends', user);
        }
        else
        {
            logger.debug("no logged in user found in app.")
        }
    }
    catch (ex) {

    }
}

function init() {
    logger.debug('comManager init begins');

    var url = 'http://10.0.0.1:5000';
    // var url = 'http://localhost:5000';

    logger.debug('initializing socket connection to '+url+' process.platform: '+process.platform);
    socket = io(url, {jsonp: false});

    socket.on('locationUpdate', async (users) => {
        var friendsStr = JSON.stringify(users);
        logger.debug('locationUpdate received with '+users.length+' friends');
        logger.debug('locationUpdate received with '+friendsStr);
        await AsyncStorage.setItem(FRIENDS_KEY, friendsStr);
        Dispatcher.emit('locationsUpdated');

    });

    socket.on('connect', () => {
        logger.debug('connected to niyoapi socket server');
        sendGetFriendsReq();
    });

    socket.on('reconnecting', () => {
        logger.debug('reconnecting to socket server');
    });

    socket.on('reconnect_attempt', () => {
        logger.debug('reconnect_attempt to socket server');
    });

    socket.on('reconnect', () => {
        logger.debug('reconnect to socket server');
    });

    socket.on('reconnect_error', () => {
        logger.debug('reconnect_error to socket server', {});
    });

    socket.on('reconnect_failed', () => {
        logger.debug('reconnect_failed to socket server', {});
    });
}

export default {
    init,
    sendGetFriendsReq
}