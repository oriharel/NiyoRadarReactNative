import * as types from '../actions/actionTypes';

const initialState = {
    loggedInUser: {}
};

export default function(state = initialState, action = {}) {
    switch (action.type) {
        case types.SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.loggedInUser
            };
        default:
            return state;
    }
}